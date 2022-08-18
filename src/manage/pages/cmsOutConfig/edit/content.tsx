import {IContentViewProps} from '@ekp-runtime/render-module'
import React, {useEffect, useRef, useState} from 'react'
import { Button, Message, Tabs} from '@lui/core'
import RoleIndex from './form/roleIndex'
import apiOutManageConfig from '@/api/cmsOutManageConfig'
import OrderIndex from './form/orderIndex'
import './index.scss'

const TabPane = Tabs.TabPane
const baseCls = 'cmsOutConfig-content'

const Content: React.FC<IContentViewProps> = props => {
  const { data } = props
  
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
  const _formatValue = async (isDraft: boolean) => {
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

      if (formValues.mechanisms) {
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


  const handleSave = async (isDraft: boolean, activeKey: string) => {
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
    const api = activeKey === 'role' ? apiOutManageConfig.updateRole : apiOutManageConfig.updateOrder
    api(values as any).then(res => {
      if (res.success) {
        Message.success('保存成功')
      } else {
        Message.error('保存失败')
      }
    }).catch(() => {
      Message.error('保存失败')
    })
  }

  
  const [activeKey, setActiveKey] = useState<string>('role')
  const [tabData, setTabData] =  useState<any>({})


  useEffect(()=>{
    const api = activeKey === 'role' ? apiOutManageConfig.getRoleConfig : apiOutManageConfig.getOrderConfig
    api({}).then(res => {
      setTabData(res.data)
    }).catch(() => {
      Message.error('查询失败')
    })

  },[activeKey])

  const onChange = (val: string)=>{
    setActiveKey(val)
  }

  return (
    <div className={`${baseCls}`}>
      <div className='form'>
        <Tabs defaultActiveKey={activeKey} onChange={ val => onChange(val)}>
          <TabPane tab={'权限配置'} key={'role'}>
            <div className={`${baseCls}-head`}>
              <Button type='primary' onClick={() => handleSave(false, 'role')}>保存</Button>
            </div>
            <RoleIndex formRef={formComponentRef} value={tabData || {}} />
          </TabPane>
          <TabPane tab={'工单处理分工设置'} key={'order'}>
            <div className={`${baseCls}-head`}>
              <Button type='primary' onClick={() => handleSave(false, 'order')}>保存</Button>
            </div>
            <OrderIndex formRef={formComponentRef} value={tabData || {}} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Content
