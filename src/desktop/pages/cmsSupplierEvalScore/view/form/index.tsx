import React, { useRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/supplier-shared/formHooks'
import XformAppearance from '@/desktop/components/supplier/XformAppearance'
import LayoutGrid from '@/desktop/components/supplier/LayoutGrid'
import GridItem from '@/desktop/components/supplier/GridItem'
import XformInput from '@/desktop/components/supplier/XformInput'
import XformFieldset from '@/desktop/components/supplier/XformFieldset'
import XformDescription from '@/desktop/components/supplier/XformDescription'
import XformDatetime from '@/desktop/components/supplier/XformDatetime'
import XformSelect from '@/desktop/components/supplier/XformSelect'
import XformRelation from '@/desktop/components/supplier/XformRelation'
import XformAddress from '@/desktop/components/supplier/XformAddress'
import XformNumber from '@/desktop/components/supplier/XformNumber'
import XformCalculate from '@/desktop/components/supplier/XformCalculate'

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
          <LayoutGrid columns={40} rows={60}>
            <GridItem column={1} row={1} rowSpan={10} columnSpan={40}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf5n8sn5bdxs9qef}', '主题')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdSubject'}
                  rules={[
                    {
                      validator: lengthValidator(100)
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf5n8wuiceij4x3c8}', '请输入')}
                    showStatus="view"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={11} rowSpan={10} columnSpan={5}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColW9zj7f'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3tkeu75xm6ht3vt7ul}', '评价周期')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={6} row={11} rowSpan={10} columnSpan={5}>
              <Form.Item name={'fdYear'}>
                <XformDatetime
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3siwq7dt54kgi38q2h}', '请输入')}
                  dataPattern={'yyyy'}
                  showStatus="view"
                ></XformDatetime>
              </Form.Item>
            </GridItem>
            <GridItem column={11} row={11} rowSpan={10} columnSpan={10}>
              <Form.Item
                name={'fdQuarter'}
                rules={[
                  {
                    validator: lengthValidator(50)
                  }
                ]}
              >
                <XformSelect
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3siwtlcxfyrxi5j6c}', '请输入')}
                  options={[
                    {
                      label: fmtMsg(':cmsSupplierEvalScore.form.!{l3siy5lkf9w293eg16s}', '第1季度'),
                      value: '1'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvalScore.form.!{l3siy5ll6caioquer7n}', '第2季度'),
                      value: '2'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvalScore.form.!{l3siy5lmj52xjr43tz}', '第3季度'),
                      value: '3'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvalScore.form.!{l3siy5lmo68vobyeyjq}', '第4季度'),
                      value: '4'
                    }
                  ]}
                  optionSource={'custom'}
                  showStatus="view"
                ></XformSelect>
              </Form.Item>
            </GridItem>
            <GridItem column={21} row={11} rowSpan={10} columnSpan={10}></GridItem>
            <GridItem column={31} row={11} rowSpan={10} columnSpan={10}></GridItem>
            <GridItem
              column={21}
              row={11}
              rowSpan={10}
              columnSpan={10}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={31}
              row={11}
              rowSpan={10}
              columnSpan={10}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem column={1} row={21} rowSpan={10} columnSpan={20}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf6exe2sf3hxy8rt4}', '供应商')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdSupplier'}>
                  <XformRelation
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
                      appCode: '1g44id6eaw8wk0aw2kn8m6v35g3cmkig7ew0',
                      xformName: '供应商信息',
                      modelId: '1g44id6llw8wk63w17bnbh9327e3p312v8w0',
                      tableType: 'main',
                      tableName: 'mk_model_2022052849wr7',
                      showFields: '$供应商名称$',
                      refFieldName: '$fd_supplier_name$'
                    }}
                    showStatus="view"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={21} row={21} rowSpan={10} columnSpan={20}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf6i8n20fnh656j6n}', '评价人')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdAppraiser'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'creator'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="view"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={31} rowSpan={10} columnSpan={20}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf6ome8v85b5bsc88}', '所属框架')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdFrame'}>
                  <XformRelation
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
                    showStatus="view"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={21} row={31} rowSpan={10} columnSpan={20}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf6z8e81jwir1r2e2}', '供应商合作状态')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdCooperationStatus'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    }
                  ]}
                >
                  <XformSelect
                    {...sysProps}
                    placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sf6z8hj1qh3n41nv7}', '请输入')}
                    options={[
                      {
                        label: fmtMsg(':cmsSupplierEvalScore.form.!{l3sfact2cqbc8i6pflv}', '未签合同'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsSupplierEvalScore.form.!{l3sfact3itclngd7ml}', '已签合同'),
                        value: '2'
                      },
                      {
                        label: fmtMsg(':cmsSupplierEvalScore.form.!{l3sfact3p6p8u2zp1lj}', '合同过期'),
                        value: '3'
                      }
                    ]}
                    optionSource={'custom'}
                    showStatus="view"
                  ></XformSelect>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={1}
              row={41}
              rowSpan={10}
              columnSpan={40}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColQntfs7'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfau04cu02dh6zgpg}',
                      '外包供应商服务情况季度评价表'
                    )}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={1}
              row={51}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                backgroundColor: 'rgba(155,155,155,1)'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColW6s4mj'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfcnpcx5qml9wq8fl}', '维度')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={1}
              row={52}
              rowSpan={2}
              columnSpan={8}
              style={{
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol032msh'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfgqfq7x05iuodqvn}', '支持力度')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={1}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}
            ></GridItem>
            <GridItem
              column={1}
              row={54}
              rowSpan={4}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol2mwbza'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfjw0am9h7mjp8opd}', '交付能力')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={9}
              row={51}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                backgroundColor: 'rgba(155,155,155,1)'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColBdpczw'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfcwemuawhiad7au}', '评价指标')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={51}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                backgroundColor: 'rgba(155,155,155,1)'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColBdo7is'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfcy6zxirwv444e5}', '说明')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={51}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                backgroundColor: 'rgba(155,155,155,1)'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColSkvwsf'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfd1sdrrvay4jisr}', '满分值')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={51}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                backgroundColor: 'rgba(155,155,155,1)'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColNv0ha3'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfd3p140p16drajcy}', '得分')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={1}
              row={52}
              rowSpan={2}
              columnSpan={8}
              style={{
                display: 'none',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol2gm849'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfgh9v9ioor6k898}', '这里是文本内容')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={9}
              row={52}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColN4plor'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sffr6lriib0m9qjhn}', '需求响应率')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={52}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColI2ms7a'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfgdtefpsw0hg3lie}',
                      '以评价期间发出的订单数为基数，按响应数量折算'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={52}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColQaqeoj'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfgfhrx5230lh2wg}', '10')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={52}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdDemandResponseScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfsg6g5gktynavwgv}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 10
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start'
              }}
            ></GridItem>
            <GridItem
              column={9}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColToksgh'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sffph0xmjuo1pw0nd}', '中选率')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColBtjk15'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sffs8pkv6g4ih88b9}',
                      '评价期间中选率最高的满分，完全未中选的0分，其余在此区间折算'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColDfdgaw'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfgledswkbspza4b}', '5')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={53}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdSelectedScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfskv95c7fnm1jylu}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 5
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={54}
              rowSpan={4}
              columnSpan={8}
              style={{
                display: 'none',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            ></GridItem>
            <GridItem
              column={9}
              row={54}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColO4zah9'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfjyjoi3d0khbpj4}', '中选人员入场率')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={54}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColGiuupg'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfjzz1jdb49v87e7b}',
                      '考察订单获取的真实性，以中选人数为基数，按实际入场人数折算，按项目数累计求平均值'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={54}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol8tj92n'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfk1g685g5qe5407}', '10')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={54}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdEntranceScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfsni4b3u28h05hot}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 10
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={55}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            ></GridItem>
            <GridItem
              column={9}
              row={55}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColA2az4b'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfk91s2y0642hg1di}', '人员交付周期/时效')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={55}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol9kei7g'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfk7l26af8i3puce}',
                      '考察交付效率，以需求订单中明确的交付时间要求为基准，在交付时间内完成所有人员交付的满分，超期超过1倍时间扣2.5分，超过2倍时间扣5分，其余超期按此折算扣分，按项目数累计求平均值'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={55}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColBlayym'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfk33bw1hnvq6ixc}', '5')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={55}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdDeliveryPeriodScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfsp3fhp3e66h2k1d}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 5
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={56}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            ></GridItem>
            <GridItem
              column={9}
              row={56}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColDcho08'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfjx6o5at22qn7r6}', '入场人员离职率')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={56}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColRkxrvk'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfk65zeomuyno8k56}',
                      '考察人员稳定性，以离职人员数（不含主动淘汰人数）/入场人数计算，以当前季度所有框架内供应商平均入场人员离职率为基准，评价期内离职率不大于基准比例的满分，超出基准比例1倍的扣5分，超过2倍的扣10分，其余超比例按此折算扣分，按项目数累计求平均值'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={56}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol279b52'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfk4qssssf1wje9bg}', '10')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={56}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdDimissionScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfss6g46lbz09jr8b}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 10
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={57}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                alignItems: 'center'
              }}
            ></GridItem>
            <GridItem
              column={9}
              row={57}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol7napv9'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfkcab72r4z1pgvsv}', '入场人员淘汰率')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={57}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColUg1cxg'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfkfrjwwpm0vx1ovs}',
                      '考察人员质量，以主动淘汰人员数/入场人数计算，以当前季度所有框架内供应商平均入场人员淘汰率为基准，评价期内离职率不大于基准比例的满分，超出基准比例1倍的扣5分，超过2倍的扣10分，其余超比例按此折算扣分，按项目数累计求平均值'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={57}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center',
                textAlign: 'right',
                justifyContent: 'flex-end'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColYymz0n'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfkhe9w7ni3ag29l}', '10')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={57}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdEliminateScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfstzx0c3t9knlpics}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 10
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={58}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColHafds7'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfoemxixxcg71l27}', '人员管理')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={9}
              row={58}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol7602p3'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfoim6muezo99wdg}', '职场行为规范情况')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={58}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol8eqj4o'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfom8fremgb62u3t}',
                      '被行政人员、保安人员等发现不遵守职场行为规范的情况，每发现一人次扣0.5分，重复发现加倍扣分'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={58}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center',
                textAlign: 'right',
                justifyContent: 'flex-end'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColJhii95'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfopyfun61h5sktdh}', '10')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={58}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdSpecificationScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfsxajqnwij1pibl}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={59}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol7tei1f'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfogkdoyu7clt4hik}', '项目完成质量')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={9}
              row={59}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColAz5k6c'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfokkgojr1fupm8v}', '服务综合质量评价')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={17}
              row={59}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColDj2vox'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsSupplierEvalScore.form.!{l3sfoo4y7nzazj2regj}',
                      '项目尾款支付时由项目经理基于供应商评价表作评价，根据评价表得分折算，按项目数累计求平均值'
                    )}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={25}
              row={59}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                alignItems: 'center',
                textAlign: 'right',
                justifyContent: 'flex-end'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColIp3bzw'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfortzupor4gcgmy8}', '40')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={59}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Form.Item name={'fdQualityEvaluateScore'}>
                <XformNumber
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvalScore.form.!{l3sfsz069bmpyifvs}', '请输入')}
                  numberFormat={{
                    formatType: 'base'
                  }}
                  range={{
                    end: 40
                  }}
                  showStatus="view"
                ></XformNumber>
              </Form.Item>
            </GridItem>
            <GridItem
              column={1}
              row={60}
              rowSpan={1}
              columnSpan={24}
              style={{
                textAlign: 'right',
                justifyContent: 'flex-end',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColOciyew'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sg5y5ofwgo68iz1rs}', '总分')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={9}
              row={60}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                textAlign: 'right',
                justifyContent: 'flex-end',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            ></GridItem>
            <GridItem
              column={17}
              row={60}
              rowSpan={1}
              columnSpan={8}
              style={{
                display: 'none',
                textAlign: 'right',
                justifyContent: 'flex-end',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            ></GridItem>
            <GridItem
              column={25}
              row={60}
              rowSpan={1}
              columnSpan={8}
              style={{
                textAlign: 'right',
                justifyContent: 'flex-end',
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol1st9bo'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvalScore.form.!{l3sg5r6b5wqdnbfv9fd}', '100')}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={33}
              row={60}
              rowSpan={1}
              columnSpan={8}
              style={{
                borderLeft: '1px solid #000000',
                borderTop: '1px solid #000000',
                borderRight: '1px solid #000000',
                borderBottom: '1px solid #000000',
                textAlign: 'right',
                justifyContent: 'flex-end'
              }}
            >
              <Form.Item name={'fdTotalScore'}>
                <XformCalculate
                  {...sysProps}
                  expressionFormulaVO={{
                    type: 'Eval',
                    script:
                      '${func.$FUNC.math_sum}(${data.biz.fd_demand_response_score},${data.biz.fd_selected_score},${data.biz.fd_entrance_score},${data.biz.fd_delivery_period_score},${data.biz.fd_dimission_score},${data.biz.fd_eliminate_score},${data.biz.fd_specification_score},${data.biz.fd_quality_evaluate_score})',
                    vo: {
                      mode: 'formula',
                      content:
                        '#计算总数#($评价打分.需求响应率得分$,$评价打分.中选率得分$,$评价打分.中选人员入场率得分$,$评价打分.人员交付周期得分$,$评价打分.入场人员离职率得分$,$评价打分.入场人员淘汰率得分$,$评价打分.职场行为规范情况得分$,$评价打分.服务综合质量评价得分$)'
                    }
                  }}
                  showStatus="view"
                ></XformCalculate>
              </Form.Item>
            </GridItem>
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
