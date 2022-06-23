import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form, Select } from '@lui/core'
import { useApi, useSystem } from '@/desktop/data-base-shared/formHooks'
import XformAppearance from '@/desktop/components/base-data/XformAppearance'
import LayoutGrid from '@/desktop/components/base-data/LayoutGrid'
import GridItem from '@/desktop/components/base-data/GridItem'
import XformDescription from '@/desktop/components/base-data/XformDescription'
import XformFieldset from '@/desktop/components/base-data/XformFieldset'
import XformInput from '@/desktop/components/base-data/XformInput'
// import XformRelation from '@/desktop/components/form/XformRelation'
import XformNumber from '@/desktop/components/base-data/XformNumber'
import XformTextarea from '@/desktop/components/base-data/XformTextarea'
import api from '@/api/cmsFrameInfo'

const { Option } = Select

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({})
  const { formRef: formRef, value: value } = props
  const [form] = Form.useForm()
  const [frameArray, setFrameArray] = useState<any>([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const res = await api.listFrameInfo({})
      setFrameArray(res.data.content)
    } catch (error) {
      console.warn('框架类型出错', error)
    }
  }
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
                <Form.Item name={'fdCol0kanfl'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsLevelInfo.form.!{l3gql65ukfdw8zhf4ma}', '级别信息')}
                    controlValueStyle={{
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsLevelInfo.form.!{l3gqlranb4740bhtdy}', '级别名称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdLevelName'}
                  rules={[
                    {
                      validator: lengthValidator(100)
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsLevelInfo.form.!{l3gqlrasbudrkvweomi}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsLevelInfo.form.!{l3md8je7ynndxj3bw6d}', '框架类型')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdFrame'}>
                  {/* <XformRelation
                    {...sysProps}
                    renderMode={'select'}
                    modelName={'com.landray.sys.xform.core.entity.design.SysXFormDesign'}
                    isForwardView={'no'}
                    options={[
                      {
                        fdName: '选项1',
                        fdId: '1'
                      },
                      {
                        fdName: '选项2',
                        fdId: '2'
                      },
                      {
                        fdName: '选项3',
                        fdId: '3'
                      }
                    ]}
                    relationCfg={{
                      appCode: '1g44id6v0w8wk87w1tojjnkomh1ni2cebpw0',
                      xformName: '框架信息',
                      modelId: '1g44id731w8wkbow1ug79a31094ejk3253w0',
                      tableType: 'main',
                      tableName: 'mk_model_20220528mgn2n',
                      showFields: '$名称$',
                      refFieldName: '$fd_name$'
                    }}
                    showStatus="edit"
                  ></XformRelation> */}
                  <Select
                    placeholder="请选择"
                  >
                    {
                      frameArray.map(item => (
                        <Option key={item.fdId} value={item.fdId}>{item.fdName}</Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsLevelInfo.form.!{l3gqm2hexkr8xwwllua}', '排序号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdOrder'}>
                  <XformNumber
                    {...sysProps}
                    placeholder={fmtMsg(':cmsLevelInfo.form.!{l3gqm2hhsg5uvvhaxok}', '请输入')}
                    numberFormat={{
                      formatType: 'base'
                    }}
                    showStatus="edit"
                  ></XformNumber>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsLevelInfo.form.!{l3gqmc4vsurzm7wo8r}', '学历与经验要求')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdRemark'}
                  rules={[
                    {
                      validator: lengthValidator(2000)
                    }
                  ]}
                >
                  <XformTextarea
                    {...sysProps}
                    placeholder={fmtMsg(':cmsLevelInfo.form.!{l3gqmc4zo25tzsdrt9s}', '请输入')}
                    height={3}
                    showStatus="edit"
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
