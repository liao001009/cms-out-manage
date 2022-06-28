//@ts-ignore
import React, { useRef, createRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-staff'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformAddress from '@/desktop/components/XformAddress'
import XformFieldset from '@/desktop/components/XformFieldset'

const MECHANISMNAMES = {}

const XForm = (props) => {
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
  const { onValuesChange, lengthValidator, ...sysProps } = useSystem({
    props,
    form,
    detailForms
  })
  return (
    <div className="lui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance>
          <LayoutGrid columns={2} rows={2}>

            <GridItem column={1} row={2}>
              <XformFieldset
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m40sd6usk04pb2c6e}', '工位地点(深圳)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdStationSz'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m43zr5d9698rvhsov}', '工位地点(武汉)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdStationWh'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>

            <GridItem column={1} row={3}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m441acwtq6wmsygt}', '云主机')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdCloudHost'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={3}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m447999fkczhl7d06}', '码云')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdGitee'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>

            <GridItem column={1} row={4}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44aicuop78fja9t}', '悟空')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdWukong'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={4}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44d0zvp90m3ysfxh}', '桌面助手')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdDesktopAide'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>

            <GridItem column={1} row={5}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44f389cb7d4msevo}', 'VPN')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdVpn'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={5}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44hnmkrmaf33hgd}', '门禁(深圳)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdEntranceGuardSz'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>

            <GridItem column={1} row={6}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44jqcr83ujayhd2}', '门禁(武汉)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdEntranceGuardWh'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={6}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44mdir8z81kk89g}', '网络权限')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdNetworkPrem'}
                  rules={[
                    {
                      required: true,
                      message:'不能为空'
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
              </XformFieldset>
            </GridItem>
            
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
