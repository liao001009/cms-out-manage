import React, { useRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-basedata'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformInput from '@/desktop/components/XformInput'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformDescription from '@/desktop/components/XformDescription'
import XformNumber from '@/desktop/components/XformNumber'
import XformTextarea from '@/desktop/components/XformTextarea'

const MECHANISMNAMES = {}
const baseCls = 'postInfo-form'

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
    <div className={baseCls}>
      <div className="lui-xform">
        <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
          <XformAppearance>
            <LayoutGrid columns={1} rows={6}>
              <GridItem column={1} row={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsPostInfo.form.!{l3gpy6z2uhsr075nrdj}', '岗位名称')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdPostName'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsPostInfo.form.!{l3gpy6zd2nn2r7gwgui}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={1}
                row={1}
                rowSpan={1}
                style={{
                  textAlign: 'center',
                  justifyContent: 'center'
                }}
              >
                <XformFieldset compose={true}>
                  <Form.Item name={'fdColEzxl9m'}>
                    <XformDescription
                      {...sysProps}
                      defaultTextValue={fmtMsg(':cmsPostInfo.form.!{l3gpz0x1fjc8xlzwrjq}', ' 岗位信息')}
                      controlValueStyle={{
                        fontSize: 20,
                        fontWeight: 'bold'
                      }}
                      showStatus="view"
                    ></XformDescription>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={3}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsPostInfo.form.!{l3md1s15d82kxfxv69q}', '框架类型')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item name={'fdFrame'}>
                    <span>{value.fdFrame.fdName}</span>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={4}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsPostInfo.form.!{l3gpye3kyy9kpcwf8o}', '排序号')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item name={'fdOrder'}>
                    <XformNumber
                      {...sysProps}
                      placeholder={fmtMsg(':cmsPostInfo.form.!{l3gpye3pxgbea9lrze}', '请输入')}
                      numberFormat={{
                        formatType: 'base'
                      }}
                      showStatus="view"
                    ></XformNumber>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={5}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsPostInfo.form.!{l3gpyfscmw81miq2be}', '基本要求')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdBaseRequire'}
                    rules={[
                      {
                        validator: lengthValidator(2000)
                      }
                    ]}
                  >
                    <XformTextarea
                      {...sysProps}
                      placeholder={fmtMsg(':cmsPostInfo.form.!{l3gpyfsh6fs72lrsqpp}', '请输入')}
                      height={3}
                      showStatus="view"
                    ></XformTextarea>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={6}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsPostInfo.form.!{l3gpyjl8qwu0o4wcuce}', '核心要求')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdCoreRequire'}
                    rules={[
                      {
                        validator: lengthValidator(2000)
                      }
                    ]}
                  >
                    <XformTextarea
                      {...sysProps}
                      placeholder={fmtMsg(':cmsPostInfo.form.!{l3gpyjlf5ogawato7g7}', '请输入')}
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
    </div>
  )
}

export default XForm
