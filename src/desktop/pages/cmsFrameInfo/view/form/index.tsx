import React, { useRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-basedata'
import XformAppearance from '@/desktop/components/base-data/XformAppearance'
import LayoutGrid from '@/desktop/components/base-data/LayoutGrid'
import GridItem from '@/desktop/components/base-data/GridItem'
import XformDescription from '@/desktop/components/base-data/XformDescription'
import XformFieldset from '@/desktop/components/base-data/XformFieldset'
import XformInput from '@/desktop/components/base-data/XformInput'
import XformNumber from '@/desktop/components/base-data/XformNumber'
import XformRadio from '@/desktop/components/base-data/XformRadio'
import XformTextarea from '@/desktop/components/base-data/XformTextarea'

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
          <LayoutGrid columns={1} rows={5}>
            <GridItem
              column={1}
              row={1}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColKvklyn'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsFrameInfo.form.!{l3mcwzg4q2r7lqbavt}', '框架信息')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameInfo.form.!{l3mcxnhj7176yrlqogh}', '框架名称')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdName'}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameInfo.form.!{l3mcxnhp0xelx30q9ujl}', '请输入')}
                    showStatus="view"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameInfo.form.!{l3nu2qru2dacsv731ws}', '排序号')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdOrder'}>
                  <XformNumber
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameInfo.form.!{l3nu2qs0hq2iqahq0rh}', '请输入')}
                    numberFormat={{
                      formatType: 'base'
                    }}
                    showStatus="view"
                  ></XformNumber>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameInfo.form.!{l3nu35ef4vhrh7886fv}', '是否项目类')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdIsProject'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsFrameInfo.form.!{l3nu3tu6z13sgdvspid}', '框架'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsFrameInfo.form.!{l3nu3tu7epl12a7dalb}', '项目'),
                        value: '2'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="view"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameInfo.form.!{l3nu3xe7weeonzm680d}', '说明')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdDesc'}
                  rules={[
                    {
                      validator: lengthValidator(2000)
                    }
                  ]}
                >
                  <XformTextarea
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameInfo.form.!{l3nu3xecxjkpegm6qkf}', '请输入')}
                    height={3}
                    showStatus="view"
                  ></XformTextarea>
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
