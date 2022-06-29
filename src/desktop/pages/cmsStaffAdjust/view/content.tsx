import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { Auth, Module } from '@ekp-infra/common'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Loading, Breadcrumb, Button, Message, Modal } from '@lui/core'
import XForm from './form'
import api from '@/api/cmsStaffAdjust'
import './index.scss'
import { EOperationType, ESysLbpmProcessStatus } from '@/utils/status'
import { getFlowStatus } from '@/desktop/shared/util'
//@ts-ignore
import Status, { EStatusType } from '@elements/status'
import apiLbpm from '@/api/cmsLbpm'
import Axios from 'axios'

Message.config({ maxCount: 1 })
// 流程页签
const LBPMTabs = Module.getComponent('sys-lbpm', 'LBPMTabs', { loading: <Loading /> })
// 流程机制
const LBPMFormFragment = Module.getComponent('sys-lbpm', 'LBPMFormFragment', { loading: <Loading /> })
// 权限机制
const RightFragment = Module.getComponent('sys-right', 'RightFragment', { loading: <Loading /> })

const { confirm } = Modal

const Content: React.FC<IContentViewProps> = props => {
  const { data, match, history } = props
  const params = match?.params
  const baseCls = 'staffAdjust-content'

  // 模板id
  const templateId = useMemo(() => {
    return data?.fdTemplate?.fdId
  }, [data])
  const [flowData, setFlowData] = useState<any>({}) // 流程数据
  const [materialVis, setMaterialVis] = useState<boolean>(true)
  const [roleArr, setRoleArr] = useState<any>([])   // 流程角色
  useEffect(() => {
    mk.on('SYS_LBPM_AUDIT_FORM_INIT_DATA', (val) => {
      val?.roles && setRoleArr(val.roles)
    })
  }, [])
  // const hasDraftBtn = useMemo(() => {
  //   const status = data?.fdProcessStatus || getFlowStatus(flowData)
  //   /* 新建文档和草稿有暂存按钮 */
  //   return status === ESysLbpmProcessStatus.DRAFT || status === ESysLbpmProcessStatus.REJECT || status === ESysLbpmProcessStatus.WITHDRAW
  // }, [data?.fdProcessStatus, flowData])
  // 机制组件引用
  const formComponentRef = useRef<any>()
  const lbpmComponentRef = useRef<any>()
  const rightComponentRef = useRef<any>()
  /** 获取资料上传节点 */
  const getCurrentNode = async () => {
    try {
      const nodeInfosData = await apiLbpm.getCurrentNodeInfo({
        processId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdProcessId
      })
      const url = mk.getSysConfig('apiUrlPrefix') + '/cms-out-manage/staff/cmsStaffEntrance/loadNodeExtendPropertiesOnProcess'
      const processData = await Axios.post(url, {
        fdId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdProcessId
      })
      if (!processData.data.length) return
      const newArr = processData.data.filter(item => {
        return nodeInfosData.data.currentNodeCards.find(item2 => item.nodeId === item2.fdNodeId && item2.fdCurrentHandlers.some(item3 => item3.id === mk.getSysConfig('currentUser').fdId))
      })
      setMaterialVis(newArr.length ? newArr[0].extendProperty.supplierApprove : false)
    } catch (error) {
      console.error('errortest2', error)
      setMaterialVis(false)
    }
  }
  useEffect(() => {
    getCurrentNode()
  }, [])

  // 校验
  const _validate = async (isDraft: boolean) => {
    // 表单校验
    if (formComponentRef.current) {
      const formErrors = await formComponentRef.current.validate()
      if (formErrors?.length > 0 && !isDraft) {
        return false
      }
      // 流程校验
      if (lbpmComponentRef.current) {
        const lbpmErrors = await lbpmComponentRef.current.getErrors()
        if (lbpmErrors?.length > 0 && !isDraft) {
          return false
        }
      }
    }
    return true
  }

  // 提交数据封装
  const _formatValue = async (isDraft: boolean) => {
    let values = {
      ...data,
      // 操作状态，10：草稿、20：提交
      docOperation: isDraft ? '10' : '20',
      //  机制数据
      mechanisms: {
        // sys-xform、lbpmProcess、sys-right、……
      } as { [key: string]: any }
    }
    // 表单机制数据
    if (formComponentRef.current) {
      const formValues = await formComponentRef.current.getValue() || {}
      values = {
        ...values,
        ...formValues
      }
    }
    // 流程机制数据
    if (lbpmComponentRef.current) {
      values.mechanisms['lbpmProcess'] = await lbpmComponentRef.current.getValue(isDraft)
    }
    // 权限机制数据
    if (rightComponentRef.current) {
      values.mechanisms['sys-right'] = await rightComponentRef.current?.getValue(isDraft)
    }
    return values
  }

  // 提交前事件
  const _beforeSave = async (isDraft: boolean) => {
    // 提交前表单预处理
    if (formComponentRef.current) {
      const beforeFormErrors = await formComponentRef.current.beforeSubmit({ isDraft })
      if (beforeFormErrors) {
        return false
      }
    }
    // 提交前流程预处理
    if (lbpmComponentRef.current && isDraft) {
      await lbpmComponentRef.current.checkSaveStatus?.()
    }
    return true
  }

  // 提交/暂存通用逻辑
  const handleSave = async (isDraft: boolean) => {
    // 校验文档
    if (await _validate(isDraft) === false) {
      return
    }
    // 拼装提交数据
    let values = await _formatValue(isDraft)
    // 文档提交前事件
    if (await _beforeSave(isDraft) === false) {
      return
    }
    values = {
      ...values,
      cmsStaffAdjustDetail: values.cmsStaffAdjustDetail.values
    }
    // 提交
    api.update(values as any).then(res => {
      if (res.success) {
        Message.success(isDraft ? '暂存成功' : '提交成功', 1, () => {
          history.goBack()
        })
      } else {
        Message.error(isDraft ? '暂存失败' : '提交失败', 1)
      }
    }).catch(() => {
      Message.error(isDraft ? '暂存失败' : '提交失败', 1)
    })
  }

  // 关闭
  const handleClose = useCallback(() => {
    history.goBack()
  }, [])


  const handleEdit = useCallback(() => {
    history.goto(`/cmsStaffAdjust/edit/${match.params['id']}`)
  }, [history])

  const handleDel = useCallback(() => {
    confirm({
      content: '确认删除此记录？',
      onOk () {
        api.delete({ fdId: data.fdId }).then(res => {
          if (res.success) {
            Message.success('删除成功')
            history.goBack()
          }
        })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }, [])

  // 提交按钮
  const _btn_submit = useMemo(() => {
    // const role = isFlowTaskRole(flowData)
    // const status = data?.fdProcessStatus || getFlowStatus(flowData)
    // const validStatus = status !== ESysLbpmProcessStatus.COMPLETED && status !== ESysLbpmProcessStatus.ABANDONED
    const submitBtn = <Button type='primary' onClick={() => handleSave(false)}>提交</Button>
    // return !hasDraftBtn ? (
    //   <Auth.Auth authURL='/staff/cmsStaffAdjust/save' params={{
    //     vo: { fdId: params['fdId'] },
    //   }}>{submitBtn}</Auth.Auth>
    // ) : (role && validStatus) && submitBtn
    if (roleArr && roleArr.length) {
      return submitBtn
    } else {
      return null
    }
  }, [data, flowData, params])

  // 编辑按钮
  const _btn_edit = useMemo(() => {
    const status = data.fdProcessStatus || getFlowStatus(flowData)
    if (status === ESysLbpmProcessStatus.ABANDONED || status === ESysLbpmProcessStatus.COMPLETED) return null
    const editBtn = <Button onClick={handleEdit}>编辑</Button>
    const authEditBtn = <Auth.Auth
      authURL='/staff/cmsStaffAdjust/edit'
      params={{
        vo: { fdId: params['id'] }
      }}
    >
      {editBtn}
    </Auth.Auth>
    return (
      status === ESysLbpmProcessStatus.DRAFT || status === ESysLbpmProcessStatus.REJECT || status === ESysLbpmProcessStatus.WITHDRAW)
      ? authEditBtn
      // 流程流转中并且有编辑权限，可编辑表单
      : (status === ESysLbpmProcessStatus.ACTIVATED
        && authEditBtn
      )
  }, [params, data])

  // 删除按钮
  const _btn_delete = useMemo(() => {
    const status = getFlowStatus(flowData)
    const deleteBtn = <Button type='default' onClick={handleDel}>删除</Button>
    return (
      // 如果有回复协同的操作，则要校验权限
      status === ESysLbpmProcessStatus.DRAFT && !lbpmComponentRef.current.checkOperationTypeExist(flowData.identity, EOperationType.handler_replyDraftCooperate)
        ? deleteBtn
        : <Auth.Auth authURL='/staff/cmsStaffAdjust/delete' params={{
          vo: { fdId: params['id'] }
        }}>
          {deleteBtn}
        </Auth.Auth>
    )
  }, [flowData, params])
  return (
    <Auth.Auth
      authURL='/staff/cmsStaffAdjust/get'
      //
      params={{ vo: { fdId: params['id'] } }}
      unauthorizedPage={
        <Status type={EStatusType._403} title='抱歉，您暂无权限访问当前页面' />
      }
    >
      <div className={baseCls}>
        <div className='lui-approve-template'>
          {/* 操作区 */}
          <div className='lui-approve-template-header'>
            <Breadcrumb>
              <Breadcrumb.Item>驻场人员管理</Breadcrumb.Item>
              <Breadcrumb.Item>查看</Breadcrumb.Item>
            </Breadcrumb>
            <div className='buttons'>
              {_btn_submit}
              {_btn_edit}
              {_btn_delete}
              <Button type='default' onClick={handleClose}>关闭</Button>
            </div>
          </div>
          {/* 内容区 */}
          <div className='lui-approve-template-content'>
            <div className='left'>
              {/* 表单信息 */}
              <div className='form'>
                <XForm formRef={formComponentRef} value={data || {}} materialVis={materialVis}  />
              </div>
              {/* 机制页签 */}
              <div className='tabs'>
                <LBPMTabs
                  fdId={templateId}
                  processId={data?.mechanisms && data.mechanisms['lbpmProcess']?.fdProcessId}
                  getFormValue={() => formComponentRef.current && formComponentRef.current.getValue()}
                  extra={[
                    {
                      key: 'right',
                      name: '权限管理',
                      children: (
                        <RightFragment
                          wrapperRef={rightComponentRef}
                          hasFlow={true}
                          mechanism={data?.mechanisms && data?.mechanisms['sys-right']}
                          getFormValue={() => formComponentRef.current && formComponentRef.current.getValue()} />
                      )
                    }
                  ]} />
              </div>
            </div>
            <div className='right'>
              {/* 审批操作 */}
              <div className='lui-approve-template-main'>
                <LBPMFormFragment
                  auditType={data.fdProcessStatus === '30' ? 'baseInfo' : 'audit'}
                  approveLayout='right'
                  mode='view'
                  wrappedComponentRef={lbpmComponentRef}
                  moduleCode='cms-out-manage'
                  onChange={(v) => setFlowData(v)}
                  mechanism={{
                    formId: templateId,
                    processTemplateId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdTemplateId,
                    processId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdProcessId
                  }}
                  getFormValue={() => formComponentRef.current && formComponentRef.current.getValue()} />
              </div>
            </div>
          </div>
        </div>
      </div>


    </Auth.Auth>

  )
}

export default Content