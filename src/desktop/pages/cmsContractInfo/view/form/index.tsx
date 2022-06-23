import React, { useRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-supplier'
import XformAppearance from '@/desktop/components/supplier/XformAppearance'
import LayoutGrid from '@/desktop/components/supplier/LayoutGrid'
import GridItem from '@/desktop/components/supplier/GridItem'
import XformDescription from '@/desktop/components/supplier/XformDescription'
import XformFieldset from '@/desktop/components/supplier/XformFieldset'
import XformInput from '@/desktop/components/supplier/XformInput'
import XformRelation from '@/desktop/components/supplier/XformRelation'
import XformDatetime from '@/desktop/components/supplier/XformDatetime'
import XformMoney from '@/desktop/components/supplier/XformMoney'
import XformRadio from '@/desktop/components/supplier/XformRadio'
import XformAddress from '@/desktop/components/supplier/XformAddress'
import XformAttach from '@/desktop/components/supplier/XformAttach'

const MECHANISMNAMES = {
  fdAtt: 'attachmentDict'
}

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
          <LayoutGrid columns={2} rows={9}>
            <GridItem
              column={1}
              row={1}
              rowSpan={1}
              columnSpan={2}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColGekjjh'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsContractInfo.form.!{l3gwgng5uch64kkrjl}', '合同信息')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwgyfieeasl38ndw}', '合同名称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdContractName'}
                  rules={[
                    {
                      validator: lengthValidator(100)
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3gwgyfousrbns41tdb}', '请输入')}
                    showStatus="view"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwmqgpkr8hk82epl8}', '供应商名称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdSupplier'}>
                  <XformRelation
                    {...sysProps}
                    renderMode={'singlelist'}
                    modelName={'com.landray.sys.xform.core.entity.design.SysXFormDesign'}
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
                    direction={'column'}
                    rowCount={3}
                    isForwardView={'no'}
                    datasource={{
                      queryCollection: {
                        linkType: '$and',
                        query: []
                      },
                      sorters: [],
                      columns: [
                        {
                          name: 'fd_supplier_name',
                          label: '供应商名称'
                        },
                        {
                          name: 'fd_org_code',
                          label: '组织机构代码'
                        },
                        {
                          name: 'fd_cooperation_status',
                          label: '供应商合作状态'
                        }
                      ],
                      filters: [],
                      isListThrough: true,
                      viewId: '1g44id6lmw8wk64w1djf9pg1dm8d6k2em0w0'
                    }}
                    showStatus="view"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3mdydlnb2158rye74g}', '所属框架')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdFrame'}>
                  <XformRelation
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
                      appCode: '1g3bqa9aqwjk0w1ks2w1lnvus8toemcp33w0',
                      xformName: '框架信息',
                      modelId: '1g44id731w8wkbow1ug79a31094ejk3253w0',
                      tableType: 'main',
                      tableName: 'mk_model_20220528mgn2n',
                      showFields: '$名称$',
                      refFieldName: '$fd_name$'
                    }}
                    showStatus="view"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwhhu749t46p6gfxo}', '合同开始日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdStartDate'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3gwhhuaz7qbu6iom1r}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwhiyfg98txa51fdl}', '合同结束日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdEndDate'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3gwhiyisrnpqm43l0t}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    dateMin={{
                      type: 'Eval',
                      script: '${data.biz.fd_start_date}',
                      vo: {
                        mode: 'formula',
                        content: '$合同信息.合同开始日期$'
                      }
                    }}
                    showStatus="view"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={6} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3hatjhsxla0q0amp5g}', '合同总金额')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdTotalAmount'}>
                  <XformMoney
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3hatji0tjcr3fnp0p}', '请输入')}
                    precision={4}
                    showStatus="view"
                  ></XformMoney>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={6} rowSpan={1} columnSpan={1}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColCc0nfd'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsContractInfo.form.!{l3jyji3tc632kphqs5p}', '（万元）')}
                    controlValueStyle={{
                      fontWeight: 'normal',
                      fontSize: 16
                    }}
                    showStatus="view"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={8} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3o53856kyd36hba8xs}', '合同签订方式')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSignWay'}
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
                        label: fmtMsg(':cmsContractInfo.form.!{l3o54mxoq5zgtpd0lfr}', '新合同'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsContractInfo.form.!{l3o54mxpft63rorgfn4}', '续约合同'),
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
            <GridItem column={1} row={9} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.fdCreator', '创建者')}
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
            <GridItem column={2} row={9} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.fdCreateTime', '创建时间')}
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
            <GridItem column={1} row={7} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwhoszf8sp3rwnr44}', '附件')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdAtt'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    }
                  ]}
                >
                  <XformAttach {...sysProps} singleMaxSize={102400000} showStatus="view"></XformAttach>
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
