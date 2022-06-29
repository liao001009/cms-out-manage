import React, { createElement as h, useMemo, useRef, useState } from 'react'
import { Auth, Module } from '@ekp-infra/common'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Loading, Breadcrumb, Button, Message, Modal } from '@lui/core'
import { EBtnType } from '@lui/core/es/components/Button'
import XForm from './form'
import api from '@/api/cmsStaffLeave'
import './index.scss'
import { ESysLbpmProcessStatus, getFlowStatus, isFlowTaskRole } from '@/desktop/shared/util'
import { EOperationType } from '@/utils/status'

Message.config({ maxCount: 1 })
// 流程页签
const LBPMTabs = Module.getComponent('sys-lbpm', 'LBPMTabs', { loading: <Loading /> })
// 流程机制
const LBPMFormFragment = Module.getComponent('sys-lbpm', 'LBPMFormFragment', { loading: <Loading /> })
// 权限机制
const RightFragment = Module.getComponent('sys-right', 'RightFragment', { loading: <Loading /> })

const Content: React.FC<IContentViewProps> = props => {
  const { data, history, match, routerPrefix } = props
  const params = match?.params
  const baseCls = 'staffLeave-content'

  // 机制组件引用
  const formComponentRef = useRef<any>()
  const lbpmComponentRef = useRef<any>()
  const rightComponentRef = useRef<any>()
  const [flowData, setFlowData] = useState<any>({}) // 流程数据

  const hasDraftBtn = useMemo(() => {
    const status = data?.fdProcessStatus || getFlowStatus(flowData)
    /* 新建文档和草稿有暂存按钮 */
    return status === ESysLbpmProcessStatus.DRAFT || status === ESysLbpmProcessStatus.REJECT || status === ESysLbpmProcessStatus.WITHDRAW
  }, [data?.fdProcessStatus, flowData])

  // 校验
  const _validate = async (isDraft: boolean) => {
    // 表单校验
    if (formComponentRef.current && !isDraft) {
      const formErrors = await formComponentRef.current.validate()
      if (formErrors?.length > 0 && !isDraft) {
        return false
      }
    }
    // 流程校验
    if (lbpmComponentRef.current) {
      const lbpmErrors = await lbpmComponentRef.current.getErrors()
      if (lbpmErrors?.length > 0 && !isDraft) {
        return false
      }
    }
    return true
  }

  // 提交数据封装
  const _formatValue = async (isDraft: boolean) => {
    let values = {
      ...data,
      // 操作状态
      docOperation: isDraft ? '10' : '20',
      //  机制数据
      mechanisms: {
        ...data.mechanisms || {},
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
    const values = await _formatValue(isDraft)
    // 文档提交前事件
    if (await _beforeSave(isDraft) === false) {
      return
    }
    // 编辑页面文档状态为草稿时点击暂存存为草稿，点击提交流程流转，其他文档状态提交按钮只保存表单
    const saveApi = isDraft ?
      api.save
      : (values.fdProcessStatus === ESysLbpmProcessStatus.DRAFT
        || values.fdProcessStatus === ESysLbpmProcessStatus.WITHDRAW
        || values.fdProcessStatus === ESysLbpmProcessStatus.REJECT ? api.update : api.save)
    // 编辑暂存
    saveApi({
      ...values,
      cmsStaffLeaveDetail: values?.cmsStaffLeaveDetail?.values || undefined
    }).then(res => {
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

  // 删除
  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除此记录?',
      icon: h(Icon, { name: 'delete', color: '#F25643' }),
      okType: 'danger' as EBtnType,
      okText: '删除',
      onOk: () => {
        api
          .delete({ fdId: data.fdId })
          .then((res) => {
            if (res.success) {
              Message.success('删除成功')
              history.goto(routerPrefix)
            } else {
              Message.error(res.data.exMsg || '删除失败')
            }
          })
          .catch((error) => {
            const errorMes = error.response.data && error.response.data.data.exMsg
            Message.error(errorMes || '删除失败')
          })
      }
    })
  }

  // 提交按钮
  const _btn_submit = useMemo(() => {
    const role = isFlowTaskRole(flowData)
    const status = data?.fdProcessStatus || getFlowStatus(flowData)
    const validStatus = status !== ESysLbpmProcessStatus.COMPLETED && status !== ESysLbpmProcessStatus.ABANDONED
    const submitBtn = <Button type='primary' onClick={() => handleSave(false)}>提交</Button>
    return !hasDraftBtn ? (
      <Auth.Auth authURL='/staff/cmsStaffLeave/save' params={{
        vo: { fdId: params['fdId'] },
      }}>{submitBtn}</Auth.Auth>
    ) : (role && validStatus) && submitBtn

  }, [data, flowData, params])

  // 暂存按钮
  const _btn_draft = useMemo(() => {
    if (
      !flowData ||
      lbpmComponentRef.current?.checkOperationTypeExist?.(flowData?.identity, EOperationType.drafter_cancelDraftCooperate)
    ) return null
    const draftBtn = <Button type='primary' onClick={() => handleSave(true)}>暂存</Button>
    //  新建文档和草稿有暂存按钮, 当流程布局是底部卡片时，顶部不显示暂存按钮
    return hasDraftBtn ? draftBtn : null
  }, [hasDraftBtn, data, flowData, params])

  // 删除按钮
  const _btn_delete = useMemo(() => {
    const status = getFlowStatus(flowData)
    const deleteBtn = <Button type='default' onClick={handleDelete}>删除</Button>
    return (
      // 如果有回复协同的操作，则要校验权限
      status === ESysLbpmProcessStatus.DRAFT && !lbpmComponentRef.current.checkOperationTypeExist(flowData.identity, EOperationType.handler_replyDraftCooperate)
        ? deleteBtn
        : <Auth.Auth authURL='/staff/cmsStaffLeave/delete' params={{
          vo: { fdId: params['fdId'] }
        }}>
          {deleteBtn}
        </Auth.Auth>
    )
  }, [flowData, params])

  return (
    <div className={baseCls}>
      <div className='lui-approve-template'>
        {/* 操作区 */}
        <div className='lui-approve-template-header'>
          <Breadcrumb>
            <Breadcrumb.Item>离场人员管理</Breadcrumb.Item>
            <Breadcrumb.Item>编辑</Breadcrumb.Item>
          </Breadcrumb>
          <div className='buttons'>
            {_btn_submit}
            {_btn_draft}
            {_btn_delete}
          </div>
        </div>
        {/* 内容区 */}
        <div className='lui-approve-template-content'>
          <div className='left'>
            {/* 表单信息 */}
            <div className='form'>
              <XForm formRef={formComponentRef} value={data || {}} {...props} />
            </div>
            {/* 机制页签 */}
            <div className='tabs'>
              <LBPMTabs
                fdId={data?.fdTemplate?.fdId}
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
                mode='edit'
                approveLayout='right'
                wrappedComponentRef={lbpmComponentRef}
                moduleCode='cms-out-manage'
                onChange={(v) => setFlowData(v)}
                mechanism={{
                  formId: data?.fdTemplate?.fdId,
                  processTemplateId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdTemplateId,
                  processId: data?.mechanisms && data.mechanisms['lbpmProcess']?.fdProcessId
                }}
                getFormValue={() => formComponentRef.current && formComponentRef.current.getValue()} />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Content