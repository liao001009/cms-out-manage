import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form, InputNumber, Select } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-basedata'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformDescription from '@/desktop/components/XformDescription'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformHidden from '@/desktop/components/XformHidden'
import XformInput from '@/desktop/components/XformInput'
import XformDatetime from '@/desktop/components/XformDatetime'
// import XformRelation from '@/desktop/components/form/XformRelation'
import XformMoney from '@/desktop/components/XformMoney'
import api from '@/api/cmsFrameInfo'

const { Option } = Select


const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({})
  const { formRef: formRef, value: value } = props
  const [form] = Form.useForm()
  const [frameArray, setFrameArray] = useState<any>([])
  const [budgeMoney, setBudgeMoney] = useState<any>(undefined)


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
  // 所属框架选择
  const handleChange = (v) => {
    console.log('v', v)
    const findDetail = value.cmsFrameBudgetDetail.find(item => item.fdFrame.fdId === v)
    console.log('findDetail', findDetail)
    form.setFieldsValue({
      fdBudgetAmount: findDetail && findDetail.fdBudgetAmount
    })
    setBudgeMoney(findDetail && findDetail.fdBudgetAmount)
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
        <XformAppearance $$tableName={'cmsFrameBudgetAdjust'}>
          <LayoutGrid columns={2} rows={5}>
            <GridItem
              column={1}
              row={1}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
              rowSpan={1}
              columnSpan={2}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColHeci5s'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3vuv6nwbs0mb8dza}', '框架预算调整')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
              <XformFieldset compose={true}>
                <Form.Item
                  name={'fdBudgetId'}
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
                    passValue={true}
                    showStatus="edit"
                  ></XformHidden>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3wtuy8w7brnyu3ze}', '预算年度')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdBudgetYear'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3wtv2ag6b5s83ck}', '请输入')}
                    dataPattern={'yyyy'}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3x8sk0e0dq0mdoadi}', '预算执行开始日期')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdStartDate'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3x8sn1d1b0kut0ie}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xa3x1ox68x0eevwi}', '预算执行结束日期')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdEndDate'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xa40ej7onx5wcgi}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xeytqcd6s18ftg}', '所属框架')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdFrame'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  {/* <XformRelation
                    {...sysProps}
                    renderMode={'select'}
                    direction={'column'}
                    rowCount={3}
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
                      showFields: '$框架名称$',
                      refFieldName: '$fd_name$'
                    }}
                    showStatus="edit"
                  ></XformRelation> */}
                  <Select
                    onChange={handleChange}
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
            <GridItem column={2} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xkxjtdwun8xgnp}', '预算金额（万元）')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdBudgetAmount'}>
                  {/* <XformMoney
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xkxmq0yusbxv6en}', '请输入')}
                    precision={4}
                    showStatus="edit"
                  ></XformMoney> */}
                  <InputNumber disabled value={budgeMoney} />
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xm6k47yn4v0mtv5}', '调整后金额（万元）')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdAfterAdjustAmount'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformMoney
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xm6mcckhhgtq30p}', '请输入')}
                    precision={2}
                    showStatus="edit"
                  ></XformMoney>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xqp9pb1c50pr02f}', '调整时间')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdAdjustTime'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudgetAdjust.form.!{l3o3xqpcxvpamivy5hp}', '请输入')}
                    dataPattern={'yyyy-MM-dd HH:mm'}
                    showStatus="view"
                  ></XformDatetime>
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
