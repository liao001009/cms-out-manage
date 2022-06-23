//@ts-ignore
import React, { useRef, createRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-staff'
import XformAppearance from '@/desktop/components/order/XformAppearance'
import LayoutGrid from '@/desktop/components/order/LayoutGrid'
import GridItem from '@/desktop/components/order/GridItem'
import XformAddress from '@/desktop/components/order/XformAddress'
import XformFieldset from '@/desktop/components/order/XformFieldset'

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
          <LayoutGrid columns={2} rows={10}>
            <GridItem column={1} row={1} columnSpan={2} rowSpan={1}>
              <XformFieldset
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m40sd6usk04pb2c6e}', '工位地点(深圳)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdStationSz'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={2}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={3}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={4}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={5}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={6}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={7}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={8}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={9}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={10}
              columnSpan={1}
              style={{
                display: 'none'
              }}
              rowSpan={1}
            ></GridItem>
            <GridItem column={1} row={2} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m43zr5d9698rvhsov}', '工位地点(武汉)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdStationWh'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m441acwtq6wmsygt}', '云主机')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdCloudHost'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m447999fkczhl7d06}', '码云')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdGitee'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44aicuop78fja9t}', '悟空')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdWukong'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={6} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44d0zvp90m3ysfxh}', '桌面助手')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdDesktopAide'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={7} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44f389cb7d4msevo}', 'VPN')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdVpn'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={8} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44hnmkrmaf33hgd}', '门禁(深圳)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdEntranceGuardSz'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={9} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44jqcr83ujayhd2}', '门禁(武汉)')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdEntranceGuardWh'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={10} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutConfig.form.!{l4m44mdir8z81kk89g}', '网络权限')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdNetworkPrem'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
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
