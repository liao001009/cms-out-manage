import XformAddress from '@/desktop/components/form/XformAddress'
import { useApi, useSystem } from '@/desktop/shared/formHooks'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import React, { useRef } from 'react'
import './index.scss'

const MECHANISMNAMES = {}

const baseCls = 'cmsOutConfig-form'
const OrderIndex = (props) => {
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
          <Form.Item name={'fdStationSz'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m40sd6usk04pb2c6e}', '工位地点(深圳)')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>

          <Form.Item name={'fdStationWh'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m43zr5d9698rvhsov}', '工位地点(武汉)')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>


          <Form.Item name={'fdCloudHost'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m441acwtq6wmsygt}', '云主机')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>

          <Form.Item name={'fdDesktopAide'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m44d0zvp90m3ysfxh}', '桌面助手')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>


          <Form.Item name={'fdVpn'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m44f389cb7d4msevo}', 'VPN')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>

          <Form.Item name={'fdEntranceGuardSz'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m44hnmkrmaf33hgd}', '门禁(深圳)')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>


          <Form.Item name={'fdEntranceGuardWh'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m44jqcr83ujayhd2}', '门禁(武汉)')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>

          <Form.Item name={'fdNetworkPrem'}
            label={fmtMsg(':cmsOutConfig.form.!{l4m44mdir8z81kk89g}', '网络权限')}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>
          <Form.Item name={'fdCoding'}
            label={'天工'}
            rules={[
              {
                required: true,
                message: '不能为空'
              }
            ]}
          >
            <XformAddress
              {...sysProps}
              org={{
                orgTypeArr: ['8'],
                defaultValueType: 'null'
              }}
              range={'all'}
              preSelectType={'fixed'}
              showStatus="edit"
            ></XformAddress>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default OrderIndex
