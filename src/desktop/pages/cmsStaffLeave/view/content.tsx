import React, { useRef, useCallback, useMemo, useState } from 'react'
import { Auth, Module } from '@ekp-infra/common'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Loading, Breadcrumb, Button, Message, Modal } from '@lui/core'
import XForm from './form'
import api from '@/api/cmsStaffLeave'
import './index.scss'
import { EOperationType, ESysLbpmProcessStatus } from '@/utils/status'
import { getFlowStatus, isFlowTaskRole } from '@/desktop/shared/util'

Message.config({ maxCount: 1 })
// 流程页签
const LBPMTabs = Module.getComponent('sys-lbpm', 'LBPMTabs', { loading: <Loading /> })
// 流程机制
const LBPMFormFragment = Module.getComponent('sys-lbpm', 'LBPMFormFragment', { loading: <Loading /> })
// 权限机制
const RightFragment = Module.getComponent('sys-right', 'RightFragment', { loading: <Loading /> })

const { confirm } = Modal

const Content: React.FC<IContentViewProps> = props => {
  const { data,match, history } = props
  const params = match?.params

  // 模板id
  const templateId = useMemo(() => {
    return data?.fdTemplate?.fdId
  }, [data])

  const [flowData, setFlowData] = useState<any>({}) // 流程数据

  const hasDraftBtn = useMemo(() => {
    const status = data?.fdProcessStatus || getFlowStatus(flowData)
    /* 新建文档和草稿有暂存按钮 */
    return status === ESysLbpmProcessStatus.DRAFT || status === ESysLbpmProcessStatus.REJECT || status === ESysLbpmProcessStatus.WITHDRAW
  }, [data?.fdProcessStatus, flowData])
  // 机制组件引用
  const formComponentRef = useRef<any>()
  const lbpmComponentRef = useRef<any>()
  const rightComponentRef = useRef<any>()

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
      cmsStaffLeaveDetail: values.cmsStaffLeaveDetail.values
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
    history.goto(`/cmsStaffLeave/edit/${data.fdId}`)
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
    const role = isFlowTaskRole(flowData)
    const status = data?.fdProcessStatus || getFlowStatus(flowData)
    if(status===ESysLbpmProcessStatus.ABANDONED) return null
    const validStatus = status !== ESysLbpmProcessStatus.COMPLETED && status !== ESysLbpmProcessStatus.ABANDONED
    const submitBtn = <Button type='primary' onClick={() => handleSave(false)}>提交</Button>
    return !hasDraftBtn ? (
      <Auth.Auth authURL='/staff/cmsStaffAdjust/save' params={{
        vo: { fdId:params['fdId']},
      }}>{submitBtn}</Auth.Auth>
    ): (role && validStatus) && submitBtn

  }, [ data, flowData,params])

  // 编辑按钮
  const _btn_edit = useMemo(() => {
    const status = data.fdProcessStatus || getFlowStatus(flowData)
    if(status===ESysLbpmProcessStatus.ABANDONED) return null
    const editBtn = <Button onClick={handleEdit}>编辑</Button>
    const authEditBtn = <Auth.Auth
      authURL='/staff/cmsStaffAdjust/edit'
      params={{
        vo: { fdId: params['fdId'] }
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
  }, [params,data])

  // 删除按钮
  const _btn_delete = useMemo(() => {
    const status = getFlowStatus(flowData)
    const deleteBtn = <Button type='default' onClick={handleDel}>删除</Button>
    return (
      // 如果有回复协同的操作，则要校验权限
      status === ESysLbpmProcessStatus.DRAFT && !lbpmComponentRef.current.checkOperationTypeExist(flowData.identity, EOperationType.handler_replyDraftCooperate)
        ? deleteBtn
        :  <Auth.Auth authURL='/staff/cmsStaffAdjust/delete' params={{
          vo: { fdId: params['fdId'] }
        }}>
          {deleteBtn}
        </Auth.Auth>
    )
  }, [ flowData, params ])
  return (
    <div className='lui-approve-template'>
      {/* 操作区 */}
      <div className='lui-approve-template-header'>
        <Breadcrumb>
          <Breadcrumb.Item>离场人员管理</Breadcrumb.Item>
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
            <XForm formRef={formComponentRef} value={data || {}} />
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
              mode='view'
              approveLayout='right'
              wrappedComponentRef={lbpmComponentRef}
              moduleCode='cms-out-manage'
              onChange={(v)=>setFlowData(v)}
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
  )
}

export default Content