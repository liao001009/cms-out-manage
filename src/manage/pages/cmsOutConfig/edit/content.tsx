import React, {useRef} from 'react'
import {IContentViewProps} from '@ekp-runtime/render-module'
import {Button, Message} from '@lui/core'

import './index.scss'
import api from '@/api/cmsOutConfig'
import XForm from './form'


const baseCls = 'cms-out-config'
const Content: React.FC<IContentViewProps> = props => {
  const { data } = props
  // 机制组件引用
  const formComponentRef = useRef<any>()


  // 校验
  const _validate = async (isDraft: boolean) => {
    debugger
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
    // 编辑提交
    api.update(values as any).then(res => {
      if (res.success) {
        Message.success('保存成功')
      } else {
        Message.error('保存失败')
      }
    }).catch(() => {
      Message.error('保存失败')
    })
  }

  return (
    <div className={`${baseCls}`}>
      <div className={`${baseCls}-head`}>
        <div className={`${baseCls}-head-text`}>权限配置</div>
        <Button type='primary' onClick={() => handleSave(false)}>保存</Button>
      </div>
      <div className='form'>
        <XForm formRef={formComponentRef} value={data || {}} />
      </div>
    </div>
  )
}

export default Content
