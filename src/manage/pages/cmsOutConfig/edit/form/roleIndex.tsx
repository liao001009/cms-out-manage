import XformInput from '@/desktop/components/form/XformInput'
import { useApi, useSystem } from '@/desktop/shared/formHooks'
import { Module } from '@ekp-infra/common'
import {  Form } from '@lui/core'
import React, { useRef } from 'react'
import './index.scss'

const MECHANISMNAMES = {}
const Address = Module.getComponent('sys-org', 'Address')

const baseCls = 'cmsOutConfig-form'
const RoleIndex = (props) => {
  const detailForms = useRef({})
  const { formRef: formRef, value: value } = props
  const [form] = Form.useForm()
  // 对外暴露接口
  useApi({
    form,
    formRef,
    value,
    MECHANISMNAMES
  })
  // 内置$$form对象，组件间的内部调用， 长度校验规则，此逻辑禁止移除与修改
  const { onValuesChange, ...sysProps } = useSystem({
    props,
    form,
    detailForms
  })
  return (
    <div className={baseCls}>
      <div className="lui-xform">
        <Form form={form} colPadding={false} onValuesChange={onValuesChange}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
        >
          <Form.Item
            name={'fdOutSupplierOrg'}
            label="外部供应商组织"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
         
            <Address orgType={15} placeholder={'请选择外部供应商组织'}/>
            {/* <XformInput
              {...sysProps}
              placeholder={'请输入'}
              showStatus="edit"
            ></XformInput> */}
          </Form.Item>

          <Form.Item
            name={'fdOrgClassId'}
            label="外部组织分类ID"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
            <XformInput
              {...sysProps}
              placeholder={'请输入'}
              showStatus="edit"
            ></XformInput>
          </Form.Item>

          {/* <Form.Item
            name={'fdPersonClassId'}
            label="外部人员分类ID"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
            <XformInput
              {...sysProps}
              placeholder={'请输入'}
              showStatus="edit"
            ></XformInput>
          </Form.Item> */}


          <Form.Item
            name={'fdSupplierAdminRoleId'}
            label="供应商管理员角色ID"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
            <XformInput
              {...sysProps}
              placeholder={'请输入'}
              showStatus="edit"
            ></XformInput>
          </Form.Item>

          {/* <Form.Item
            name={'fdSupplierUserRoleId'}
            label="普通供应商管理员角色ID"
            rules={[
              {
                required: true,
                message: '内容不能为空'
              }
            ]}
          >
            <XformInput
              {...sysProps}
              placeholder={'请输入'}
              showStatus="edit"
            ></XformInput>
          </Form.Item> */}
               
        </Form>
      </div>
    </div>
  )
}

export default RoleIndex
