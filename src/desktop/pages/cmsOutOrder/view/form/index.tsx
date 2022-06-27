//@ts-ignore
import React, { useRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-staff'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformAddress from '@/desktop/components/XformAddress'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformInput from '@/desktop/components/XformInput'
import XformTextarea from '@/desktop/components/XformTextarea'
import XformDatetime from '@/desktop/components/XformDatetime'
import XformHidden from '@/desktop/components/XformHidden'
import XformSwitch from '@/desktop/components/XformSwitch'

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
          <LayoutGrid columns={2} rows={5}>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={1}>
              <XformFieldset
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.form.!{l4m5xxe6baf7cerkkuc}', '处理人')}
                layout={'horizontal'}
                labelTextAlign={'left'}
                required={true}
              >
                <Form.Item name={'fdHandler'}>
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
            <GridItem column={1} row={1} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.form.!{l4m6cv8ybejj8m773mt}', '权限项目')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdPermissionItem'}
                  rules={[
                    {
                      validator: lengthValidator(100)
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsOutOrder.form.!{l4m6cv90ajemoeg87l}', '请输入')}
                    showStatus="view"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={1}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.form.!{l4m6frdxc2l7q38c6re}', '说明')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdExplain'}
                  rules={[
                    {
                      validator: lengthValidator(2000)
                    }
                  ]}
                >
                  <XformTextarea
                    {...sysProps}
                    placeholder={fmtMsg(':cmsOutOrder.form.!{l4m6frdyp04sdwk2ef}', '请输入')}
                    height={3}
                    showStatus="view"
                  ></XformTextarea>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.fdCreator', '创建者')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdCreator'}
                  rules={[
                    {
                      validator: lengthValidator(60)
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
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.fdCreateTime', '创建时间')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdCreateTime'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={'请输入'}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={4}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset compose={true}>
                <Form.Item
                  name={'fdEntityId'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    }
                  ]}
                >
                  <XformHidden
                    {...sysProps}
                    controlType={{
                      value: XformInput
                    }}
                    showStatus="view"
                  ></XformHidden>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset compose={true}>
                <Form.Item
                  name={'fdEntityName'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    }
                  ]}
                >
                  <XformHidden
                    {...sysProps}
                    controlType={{
                      value: XformInput
                    }}
                    showStatus="view"
                  ></XformHidden>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={5}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={3}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={2} row={2} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsOutOrder.form.!{l4m5yx1j70uflvtclh2}', '是否己处理')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdIsHandle'}>
                  <XformSwitch
                    {...sysProps}
                    defaultValue={'yes'}
                    fontSize={'12px'}
                    switchSize={{
                      width: 50,
                      height: 24,
                      isLock: true
                    }}
                    openCfg={{
                      colorMap: {
                        background: {
                          label: '背景色',
                          color: '#4285F4'
                        },
                        font: {
                          label: '文字色',
                          color: '#fff'
                        }
                      }
                    }}
                    closeCfg={{
                      colorMap: {
                        background: {
                          label: '背景色',
                          color: '#c3c3c3'
                        },
                        font: {
                          label: '文字色',
                          color: '#fff'
                        }
                      }
                    }}
                    showStatus="view"
                  ></XformSwitch>
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
