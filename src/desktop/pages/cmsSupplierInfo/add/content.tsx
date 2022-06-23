import React, { useRef, useCallback } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Breadcrumb, Button, Message } from '@lui/core'
import XForm from './form'
import api from '@/api/cmsSupplierInfo'
import './index.scss'

const Content: React.FC<IContentViewProps> = props => {
  const { data, history } = props
  // 机制组件引用
  const formComponentRef = useRef<any>()

  // 校验
  const _validate = async (isDraft: boolean) => {
    // 表单校验
    if (formComponentRef.current && !isDraft) {
      const formErrors = await formComponentRef.current.validate()
      if (formErrors?.length > 0 && !isDraft) {
        return false
      }
    }
    return true
  }

  // 提交数据封装
  const _formatValue = async () => {
    let values = {
      ...data,
    }
    // 表单机制数据
    if (formComponentRef.current) {
      const formValues = await formComponentRef.current.getValue() || {}
      values = {
        ...values,
        ...formValues
      }
     
      if(formValues.mechanisms){
        delete values.mechanisms
      }
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
    return true
  }

  // 提交/暂存通用逻辑
  const handleSave = async (isDraft: boolean) => {
    // 校验文档
    if (await _validate(isDraft) === false) {
      return
    }
    // 拼装提交数据
    const values = await _formatValue()
    // 文档提交前事件
    if (await _beforeSave(isDraft) === false) {
      return
    }
    let addValues = {}
    if(values.cmsSupplierLinkman.length){
      addValues = {
        ...values,
      }
    }else{
      addValues = {
        ...values,
        cmsSupplierLinkman:values.cmsSupplierLinkman.values
      }
    }
    // 提交
    api.add(addValues as any).then(res => {
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

  return (
    <div className='lui-approve-template'>
      {/* 操作区 */}
      <div className='lui-approve-template-header'>
        <Breadcrumb>
          <Breadcrumb.Item>供应商管理</Breadcrumb.Item>
          <Breadcrumb.Item>新建</Breadcrumb.Item>
        </Breadcrumb>
        <div className='buttons'>
          <Button type='primary' onClick={() => handleSave(false)}>提交</Button>
          <Button type='default' onClick={handleClose}>关闭</Button>
        </div>
      </div>
      {/* 内容区 */}
      <div className='lui-approve-template-content'>
        {/* 表单信息 */}
        <div className='form'>
          <XForm formRef={formComponentRef} value={data || {}} />
        </div>
      </div>
    </div>
  )
}

export default Content