import React, { useRef, createRef } from 'react'
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
import XformDatetime from '@/desktop/components/supplier/XformDatetime'
import XformSelect from '@/desktop/components/supplier/XformSelect'
import XformAddress from '@/desktop/components/supplier/XformAddress'
import XformRelation from '@/desktop/components/supplier/XformRelation'
import XformDetailTable from '@/desktop/components/supplier/XformDetailTable'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsSupplierEvalDetail: createRef() as any
  })
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
          <LayoutGrid columns={24} rows={9}>
            <GridItem
              column={1}
              row={1}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
              rowSpan={1}
              columnSpan={24}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColVutko7'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvaluate.form.!{l3sejhocnh880gy9z1r}', '供应商评价')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={24}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvaluate.form.!{l3sek2gtuigb3zvu1en}', '主题')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSubject'}
                  rules={[
                    {
                      validator: lengthValidator(100)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsSupplierEvaluate.form.!{l3sek2gxmno5vpqnxd}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={4}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColNivfbr'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierEvaluate.form.!{l3sisw5w4aewxhykdlt}', '评价周期')}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={5} row={3} rowSpan={1} columnSpan={4}>
              <Form.Item name={'fdYear'}>
                <XformDatetime
                  {...sysProps}
                  placeholder={fmtMsg(':cmsSupplierEvaluate.form.!{l3sipk6sa1dur4z20xp}', '请输入')}
                  dataPattern={'yyyy'}
                  showStatus="edit"
                ></XformDatetime>
              </Form.Item>
            </GridItem>
            <GridItem column={9} row={3} rowSpan={1} columnSpan={4}>
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
                  placeholder={fmtMsg(':cmsSupplierEvaluate.form.!{l3siog7xa9boqqb3729}', '请输入')}
                  options={[
                    {
                      label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sir8ba17pjqu9k8hl}', '第1季度'),
                      value: '1'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sir8bbtsm2exw0nqk}', '第2季度'),
                      value: '2'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sir8bbopne48dqhyn}', '第3季度'),
                      value: '3'
                    },
                    {
                      label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sir8bbth4alqyjuf}', '第4季度'),
                      value: '4'
                    }
                  ]}
                  optionSource={'custom'}
                  showStatus="edit"
                ></XformSelect>
              </Form.Item>
            </GridItem>
            <GridItem
              column={4}
              row={3}
              rowSpan={1}
              columnSpan={3}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={7}
              row={3}
              rowSpan={1}
              columnSpan={6}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem column={13} row={3} rowSpan={1} columnSpan={12}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvaluate.form.!{l3sekqaslx6jqu3n55q}', '评价人')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdAppraiser'}>
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
            <GridItem column={1} row={4} rowSpan={1} columnSpan={12}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvaluate.fdCreator', '创建者')}
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
                    showStatus="edit"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={13} row={4} rowSpan={1} columnSpan={12}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvaluate.fdCreateTime', '创建时间')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdCreateTime'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={'请输入'}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={24}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierEvaluate.form.!{l3sela7yl29ogb6ok5c}', '挑选供应商')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdSuppliers'}>
                  <XformRelation
                    {...sysProps}
                    renderMode={'mullist'}
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
                    multi={true}
                    relationCfg={{
                      appCode: '1g44id6eaw8wk0aw2kn8m6v35g3cmkig7ew0',
                      xformName: '供应商信息',
                      modelId: '1g44id6llw8wk63w17bnbh9327e3p312v8w0',
                      tableType: 'main',
                      tableName: 'mk_model_2022052849wr7',
                      showFields: '$供应商名称$',
                      refFieldName: '$fd_supplier_name$'
                    }}
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
                          name: 'fdCooperationStatus',
                          label: '供应商合作状态'
                        },
                        {
                          name: 'fdFrame',
                          label: '所属框架'
                        }
                      ],
                      filters: [
                        {
                          name: 'fd_supplier_name',
                          label: '供应商名称'
                        },
                        {
                          name: 'fd_org_code',
                          label: '组织机构代码'
                        },
                        {
                          name: 'fdCooperationStatus',
                          label: '供应商合作状态'
                        },
                        {
                          name: 'fdFrame',
                          label: '所属框架'
                        }
                      ],
                      isListThrough: true
                    }}
                    showStatus="edit"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={6} rowSpan={1} columnSpan={24}>
              <XformFieldset>
                <Form.Item
                  name={'cmsSupplierEvalDetail'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsSupplierEvalDetail.current
                          .validate()
                          .then((error) => {
                            error ? callback(error) : callback()
                          })
                          .catch(() => {
                            callback('明细表校验不通过！')
                          })
                      }
                    }
                  ]}
                >
                  <XformDetailTable
                    {...sysProps}
                    $$ref={detailForms.current.cmsSupplierEvalDetail}
                    $$tableType="detail"
                    $$tableName="cmsSupplierEvalDetail"
                    title={fmtMsg(':cmsSupplierEvaluate.form.!{l3selfi9o2mjlph370f}', '明细表1')}
                    defaultRowNumber={1}
                    mobileRender={['simple']}
                    pcSetting={['pagination']}
                    showNumber={true}
                    layout={'vertical'}
                    hiddenLabel={true}
                    columns={[
                      {
                        type: XformRelation,
                        controlProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq49nqgd10x7yakm}', '供应商名称'),
                          name: 'fdSupplier',
                          renderMode: 'singlelist',
                          direction: 'column',
                          rowCount: 3,
                          modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                          isForwardView: 'no',
                          options: [
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
                          ],
                          desktop: {
                            type: XformRelation
                          },
                          relationCfg: {
                            appCode: '1g44id6eaw8wk0aw2kn8m6v35g3cmkig7ew0',
                            xformName: '供应商信息',
                            modelId: '1g44id6llw8wk63w17bnbh9327e3p312v8w0',
                            tableType: 'main',
                            tableName: 'mk_model_2022052849wr7',
                            showFields: '$供应商名称$',
                            refFieldName: '$fd_supplier_name$'
                          },
                          datasource: {
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
                                name: 'fdFrame',
                                label: '所属框架'
                              },
                              {
                                name: 'fdCooperationStatus',
                                label: '供应商合作状态'
                              }
                            ],
                            filters: [],
                            isListThrough: true
                          },
                          outParams: {
                            params: [
                              {
                                sourceField: {
                                  fdType: 'relation',
                                  fdName: 'fdFrame',
                                  tableName: 'cmsSupplierEvalDetail'
                                },
                                targetField: {
                                  fdType: 'relation',
                                  fdName: 'fdFrame',
                                  tableName: 'main'
                                }
                              },
                              {
                                sourceField: {
                                  fdType: 'select',
                                  fdName: 'fdCooperationStatus',
                                  tableName: 'cmsSupplierEvalDetail'
                                },
                                targetField: {
                                  fdType: 'radio',
                                  fdName: 'fdCooperationStatus',
                                  tableName: 'main'
                                }
                              }
                            ]
                          },
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq49nqgd10x7yakm}', '供应商名称'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq49nqgd10x7yakm}', '供应商名称'),
                        options: {
                          validateRules: {
                            required: true,
                            message: fmtMsg(':required', '内容不能为空')
                          }
                        }
                      },
                      {
                        type: XformRelation,
                        controlProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq63mggyn44ny83a}', '所选框架'),
                          name: 'fdFrame',
                          renderMode: 'select',
                          direction: 'column',
                          rowCount: 3,
                          modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                          isForwardView: 'no',
                          options: [
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
                          ],
                          desktop: {
                            type: XformRelation
                          },
                          relationCfg: {
                            appCode: '1g44id6v0w8wk87w1tojjnkomh1ni2cebpw0',
                            xformName: '框架信息',
                            modelId: '1g44id731w8wkbow1ug79a31094ejk3253w0',
                            tableType: 'main',
                            tableName: 'mk_model_20220528mgn2n',
                            showFields: '$框架名称$',
                            refFieldName: '$fd_name$'
                          },
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq63mggyn44ny83a}', '所选框架'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierEvaluate.form.!{l3seq63mggyn44ny83a}', '所选框架')
                      },
                      {
                        type: XformSelect,
                        controlProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seqh90nj3ul38m3ar}', '供应商合作状态'),
                          maxLength: 50,
                          name: 'fdCooperationStatus',
                          placeholder: fmtMsg(':cmsSupplierEvaluate.form.!{l3seqh93j1957cn8l1}', '请输入'),
                          options: [
                            {
                              label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sesdrgswfebvpk16}', '未签合同'),
                              value: '1'
                            },
                            {
                              label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sesdrhdxo6f0bv8pq}', '已签合同'),
                              value: '2'
                            },
                            {
                              label: fmtMsg(':cmsSupplierEvaluate.form.!{l3sesdri2lje2q222e3}', '合同过期'),
                              value: '3'
                            }
                          ],
                          optionSource: 'custom',
                          desktop: {
                            type: XformSelect
                          },
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierEvaluate.form.!{l3seqh90nj3ul38m3ar}', '供应商合作状态'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierEvaluate.form.!{l3seqh90nj3ul38m3ar}', '供应商合作状态')
                      }
                    ]}
                    canAddRow={true}
                    canDeleteRow={true}
                    canImport={true}
                    showStatus="edit"
                  ></XformDetailTable>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={7} rowSpan={1} columnSpan={24}></GridItem>
            <GridItem column={1} row={8} rowSpan={1} columnSpan={24}></GridItem>
            <GridItem column={1} row={9} rowSpan={1} columnSpan={24}></GridItem>
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
