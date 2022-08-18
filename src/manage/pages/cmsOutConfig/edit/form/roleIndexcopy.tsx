import React, {useRef} from 'react'
import './index.scss'
import {Form} from '@lui/core'
import {useApi, useSystem} from '@/desktop/shared/formHooks'
import XformAppearance from '@/desktop/components/form/XformAppearance'
import LayoutGrid from '@/desktop/components/form/LayoutGrid'
import GridItem from '@/desktop/components/form/GridItem'
import XformFieldset from '@/desktop/components/form/XformFieldset'
import XformInput from '@/desktop/components/form/XformInput'

const MECHANISMNAMES = {}

const baseCls = 'cmsOutConfig-form'
const RoleIndex = (props) => {
  console.log('props------',props)
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
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 10 }}
        >
          <XformAppearance>
            <LayoutGrid columns={0} rows={1}>
              <GridItem column={0} row={0}>
                <XformFieldset
                  mobileContentAlign={'right'}
                  title={'供应商管理员角色ID'}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdSupplierAdminRoleId'}
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

                </XformFieldset>
              </GridItem>
              <GridItem column={0} row={1}>
                <XformFieldset
                  mobileContentAlign={'right'}
                  title={'普通供应商管理员角色ID'}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdSupplierUserRoleId'}
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
                </XformFieldset>
              </GridItem>
            </LayoutGrid>
          </XformAppearance>
        </Form>
      </div>
    </div>
  )
}

export default RoleIndex
