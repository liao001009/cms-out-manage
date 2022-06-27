import React, { useRef, createRef, useState, useEffect } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-staff'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformDescription from '@/desktop/components/XformDescription'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformInput from '@/desktop/components/XformInput'
import XformAddress from '@/desktop/components/XformAddress'
import XformDatetime from '@/desktop/components/XformDatetime'
import XformSelect from '@/desktop/components/XformSelect'
import XformRadio from '@/desktop/components/XformRadio'
import XformCheckbox from '@/desktop/components/XformCheckbox'
import XformDetailTable from '@/desktop/components/XformDetailTable'
import CMSXformModal, { EShowStatus } from '@/desktop/components/staff-cms/XformModal'
import CMSXformRelation from '@/desktop/components/staff-cms/XformRelation'
import { Module } from '@ekp-infra/common'
import { outStaffInfoColumns, projectColumns, supplierColumns } from '@/desktop/common'
import { handleIdCard } from '@/utils/util'

import api from '@/api/cmsProjectInfo'
import apiSupplier from '@/api/cmsSupplierInfo'
import apiStaffInfo from '@/api/cmsOutStaffInfo'
import apiPostInfo from '@/api/cmsPostInfo'
import apiStaffAttConfig from '@/api/cmsStaffAttConfig'


const Upload = Module.getComponent('sys-attach', 'Upload')

const MECHANISMNAMES = {
  fdAtt: 'attachmentDict',
  fdAttTemplate: 'attachmentDict'
}

const XForm = (props) => {
  const detailForms = useRef({
    cmsStaffProjectDetail: createRef() as any,
    cmsStaffImplDetail: createRef() as any
  })
  const { formRef: formRef, value: value } = props
  const [projectNatureVis, setProjectNatureVis] = useState<string>(value.fdProjectNature)
  const [stationVis, setStationVis] = useState<string>(value.fdStation)

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
  const init = () => {
    const { query } = props
    apiStaffAttConfig.get({ ...query, mechanisms: { load: '*' } }).then(res => {
      // @ts-ignore
      const { attachment } = res.data?.mechanisms || []
      const fdAttTemplate = attachment.filter(i => i.fdEntityKey === 'fdEntranceAtt')
      form.setFieldsValue({
        fdAttTemplate
      })
    })
  }
  useEffect(() => {
    init()
  }, [])
  // 项目选择返回数据
  const handleProjectChange = (v) => {
    setProjectNatureVis(v.fdProjectNature)
    form.setFieldsValue({
      fdProjectNature: v.fdProjectNature,
      fdBelongDept: v.fdBelongDept,
      fdBelongTeam: v.fdBelongTeam,
      fdProjectPrincipal: v.fdProjectPrincipal,
    })
  }


  return (
    <div className="lui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance>
          <LayoutGrid columns={2} rows={27}>
            <GridItem
              column={1}
              row={1}
              columnSpan={2}
              rowSpan={1}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColW8681j'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsStaffEntrance.form.!{l47tccxkxgt8l4u79b}', '入场申请')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={1}
              style={{
                display: 'none',
                textAlign: 'center',
                justifyContent: 'center'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={2} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tdsgnsqlan2qugs}', '主题')}
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
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l47tdsgrggkbannq8wq}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={2}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.fdCreator', '创建者')}
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
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.fdCreatorDept', '创建者部门')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdCreatorDept'}
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
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tew2ifoxlw7bkh0n}', '联系电话')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdMobile'}
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
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l47tew2lx3mngvk63i}', '请输入')}
                    defaultValueFormulaVO={{
                      type: 'Eval',
                      script: '${func.sysorg.getOrgAttributeVal}(${data.biz.fd_creator}, 8,\'fdMobileNo\')',
                      vo: {
                        mode: 'formula',
                        content: '#查找组织属性#($入场申请.创建人[内置]$, 8,\'fdMobileNo\')'
                      }
                    }}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.fdCreateTime', '创建时间')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdCreateTime'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={'请输入'}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="readOnly"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tsmjxv026iy3m5pq}', '所属系统/项目')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdProject'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <CMSXformModal
                    {...props}
                    columnsProps={projectColumns}
                    chooseFdName='fdName'
                    apiKey={api}
                    apiName={'listProjectInfo'}
                    criteriaKey='projectCriertia'
                    showStatus={EShowStatus.add}
                    modalTitle='所属项目选择'
                    onChange={(v) => handleProjectChange(v)}
                    criteriaProps={['fdCode', 'fdFrame.fdName']}
                  />
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={5}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={6} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47ttg3tiiqpx7grzy}', '项目性质')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdProjectNature'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    }
                  ]}
                >
                  <XformSelect
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l47ttg3xezj8mzsyof8}', '请输入')}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47ty6pkj20dw7rf8kk}', '项目外包'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47ty6pk7x34hzxmf5j}', '厂商驻场实施'),
                        value: '2'
                      }
                    ]}
                    optionSource={'custom'}
                    showStatus="readOnly"
                  ></XformSelect>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={6}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tv7qef3air72gz8d}', '所属部门')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdBelongDept'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['2'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tvat3dedkd23oqtn}', '所属组/团队')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdBelongTeam'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['2'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={8} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tv9c980rr18iqk8u}', '项目负责人')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdProjectPrincipal'}>
                  <XformAddress
                    {...sysProps}
                    org={{
                      orgTypeArr: ['8'],
                      defaultValueType: 'null'
                    }}
                    range={'all'}
                    preSelectType={'fixed'}
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={8} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47tvd32luja2sqot3t}', '内部负责人')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdInnerPrincipal'}>
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
            <GridItem column={1} row={9} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47u969syof5zpb4gw}', '入场供应商')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSupplier'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <CMSXformModal
                    {...props}
                    columnsProps={supplierColumns}
                    chooseFdName='fdSupplierName'
                    apiKey={apiSupplier}
                    apiName={'listSupplierInfo'}
                    criteriaKey='supplierCriertia'
                    showStatus={EShowStatus.add}
                    modalTitle='供应商选择'
                    criteriaProps={['fdOrgCode', 'fdFrame.fdName']}
                  />
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={9}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            {
              projectNatureVis === '1' ? (
                <React.Fragment>
                  <GridItem column={1} row={10} columnSpan={2} rowSpan={1}>
                    <XformFieldset>
                      <Form.Item
                        name={'cmsStaffProjectDetail'}
                        noStyle
                        rules={[
                          {
                            validator: (rule, value, callback) => {
                              detailForms.current.cmsStaffProjectDetail.current
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
                          $$ref={detailForms.current.cmsStaffProjectDetail}
                          $$tableType="detail"
                          $$tableName="cmsStaffProjectDetail"
                          title={fmtMsg(':cmsStaffEntrance.form.!{l47ubnidlwzsgmgcbxm}', '项目外包人员信息')}
                          defaultRowNumber={1}
                          mobileRender={['simple']}
                          pcSetting={['pagination']}
                          showNumber={true}
                          layout={'vertical'}
                          labelStyle={{
                            fontWeight: 'bold'
                          }}

                          columns={[
                            {
                              type: CMSXformModal,
                              controlProps: {
                                apiKey: apiStaffInfo,
                                apiName: 'listStaffInfo',
                                chooseFdName: 'fdName',
                                criteriaKey: 'presonCriertia',
                                columnsProps: outStaffInfoColumns,
                                modalTitle: '外包人员信息',
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ucie6axg62p00qnq}', '姓名'),
                                name: 'fdStaffName',
                                renderMode: 'singlelist',
                                direction: 'column',
                                rowCount: 3,
                                modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                                isForwardView: 'no',
                                desktop: {
                                  type: CMSXformModal
                                },
                                onChangeProps: (v, r) => {
                                  sysProps.$$form.current.updateFormItemProps('cmsStaffProjectDetail', {
                                    rowValue: {
                                      rowNum: r,
                                      value: {
                                        fdSex: v.fdSex,
                                        fdNamePinyin: v.fdNamePinyin,
                                        fdCardNo: v.fdCardNo,
                                        fdEmail: v.fdEmail,
                                        fdMobile: v.fdMobile,
                                        fdPost: v.fdPost,
                                        fdStaffName: { ...v }
                                      }
                                    }
                                  })
                                },
                                relationCfg: {
                                  appCode: '1g44id6eaw8wk0aw2kn8m6v35g3cmkig7ew0',
                                  xformName: '外包人员信息',
                                  modelId: '1g44id6odw8wk75wge0p5v1s9g7s02ppnpw0',
                                  tableType: 'main',
                                  tableName: 'mk_model_202205284tv70',
                                  showFields: '$姓名$',
                                  refFieldName: '$fd_name$'
                                },
                                type: CMSXformModal,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ucie6axg62p00qnq}', '姓名'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47ucie6axg62p00qnq}', '姓名'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformRadio,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uex7008osj31yh4i}', '性别'),
                                maxLength: 50,
                                name: 'fdSex',
                                options: [
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l47uf529t7fwxd78ive}', '男'),
                                    value: 'M'
                                  },
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l47uf529hxbmedxyhn}', '女'),
                                    value: 'F'
                                  }
                                ],
                                rowCount: 3,
                                direction: 'column',
                                serialType: 'empty',
                                optionSource: 'custom',
                                desktop: {
                                  type: XformRadio
                                },
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uex7008osj31yh4i}', '性别'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uex7008osj31yh4i}', '性别'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                                maxLength: 100,
                                name: 'fdNamePinyin',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47ufatfw9bq6eb3ll}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufcy9axbvwljm4b}', '身份证号码'),
                                maxLength: 100,
                                name: 'fdCardNo',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47ufcydfs2q42e7lo}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufcy9axbvwljm4b}', '身份证号码'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47ufcy9axbvwljm4b}', '身份证号码'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                                maxLength: 100,
                                name: 'fdEmail',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47ufjyyxv7t9gzeju}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                type: XformInput,
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                                maxLength: 100,
                                name: 'fdMobile',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47ufnh0dgokdxysj36}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: CMSXformRelation,
                              controlProps: {
                                apiRequest: apiPostInfo.listPostInfo({}),
                                showFdName: 'fdName',
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uj8xqn12hrn7qfeg}', '岗位'),
                                name: 'fdPost',
                                renderMode: 'select',
                                direction: 'column',
                                rowCount: 3,
                                modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                                isForwardView: 'no',
                                desktop: {
                                  type: CMSXformRelation
                                },
                                relationCfg: {
                                  appCode: '1g44id6v0w8wk87w1tojjnkomh1ni2cebpw0',
                                  xformName: '岗位信息',
                                  modelId: '1g44id73fw8wkc6w27c0s7933o6cop37few0',
                                  tableType: 'main',
                                  tableName: 'mk_model_202205280ut12',
                                  showFields: '$岗位名称$',
                                  refFieldName: '$fd_post_name$'
                                },
                                showStatus: 'view'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uj8xqn12hrn7qfeg}', '岗位'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uj8xqn12hrn7qfeg}', '岗位'),
                              // options: {
                              //   validateRules: {
                              //     required: true,
                              //     message: fmtMsg(':required', '内容不能为空')
                              //   }
                              // }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                                maxLength: 100,
                                name: 'fdSystemAccount',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uk9k0ylj9507ayb}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformSelect,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l483i8mwq03pbk2tcd}', '中选/增补'),
                                maxLength: 50,
                                name: 'fdSelectSupplement',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l483i8mz523tvxz157u}', '请输入'),
                                options: [
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l483iuh5ed5rvk1mb2l}', '中选'),
                                    value: '1'
                                  },
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l483iuh5fvpjdici4mr}', '增补'),
                                    value: '2'
                                  }
                                ],
                                optionSource: 'custom',
                                desktop: {
                                  type: XformSelect
                                },
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l483i8mwq03pbk2tcd}', '中选/增补'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l483i8mwq03pbk2tcd}', '中选/增补'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            }
                          ]}
                          canAddRow={true}
                          canDeleteRow={true}
                          canImport={false}
                          canExport={false}
                          canExpand={false}
                          showStatus="edit"
                        ></XformDetailTable>
                      </Form.Item>
                    </XformFieldset>
                  </GridItem>
                  <GridItem
                    column={2}
                    row={10}
                    style={{
                      display: 'none'
                    }}
                    rowSpan={1}
                    columnSpan={1}
                  ></GridItem>
                </React.Fragment>
              ) : projectNatureVis === '2' ? (
                <React.Fragment>
                  <GridItem column={1} row={11} columnSpan={2} rowSpan={1}>
                    <XformFieldset>
                      <Form.Item
                        name={'cmsStaffImplDetail'}
                        noStyle
                        rules={[
                          {
                            validator: (rule, value, callback) => {
                              detailForms.current.cmsStaffImplDetail.current
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
                          $$ref={detailForms.current.cmsStaffImplDetail}
                          $$tableType="detail"
                          $$tableName="cmsStaffImplDetail"
                          title={fmtMsg(':cmsStaffEntrance.form.!{l47uub9dsn08ldijk8}', '厂商实施人员信息')}
                          label={fmtMsg(':cmsStaffEntrance.form.!{l47uub9dsn08ldijk8}', '厂商实施人员信息')}
                          defaultRowNumber={1}
                          mobileRender={['simple']}
                          pcSetting={['pagination']}
                          showNumber={true}
                          layout={'vertical'}
                          labelStyle={{
                            fontWeight: 'bold'
                          }}
                          columns={[
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uv8n5vj2vtorgor}', '姓名'),
                                maxLength: 100,
                                name: 'fdStaffName',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uv8na7hxt6u8xg1v}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                showStatus: 'edit',

                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uv8n5vj2vtorgor}', '姓名'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uv8n5vj2vtorgor}', '姓名'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dm1d1kyt74}', '姓名拼音'),
                                maxLength: 100,
                                name: 'fdNamePinyin',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dctz2xfjdr9i}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                fdSysNumber: {},
                                type: XformInput,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dm1d1kyt74}', '姓名拼音'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dm1d1kyt74}', '姓名拼音'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d0wbq7aqz8etq}', '身份证号码'),
                                maxLength: 100,
                                name: 'fdCardNo',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uub9deedc5vhkuq8}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                fdSysNumber: {},
                                type: XformInput,
                                showStatus: 'edit',
                                controlActions: {
                                  'onBlur': [{
                                    function: (v, r) => {
                                      sysProps.$$form.current.updateFormItemProps('cmsStaffImplDetail', {
                                        rowValue: {
                                          rowNum: r,
                                          value: {
                                            fdCardNo: v.target.value,
                                            fdSex: handleIdCard(v.target.value)
                                          }
                                        }
                                      })
                                    }
                                  }]
                                }
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d0wbq7aqz8etq}', '身份证号码'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d0wbq7aqz8etq}', '身份证号码'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformRadio,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dbq88pweuhyc}', '性别'),
                                maxLength: 50,
                                name: 'fdSex',
                                options: [
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dw8kirlo7dd}', '男'),
                                    value: 'M'
                                  },
                                  {
                                    label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dzc90y11elro}', '女'),
                                    value: 'F'
                                  }
                                ],
                                rowCount: 3,
                                direction: 'column',
                                serialType: 'empty',
                                optionSource: 'custom',
                                desktop: {
                                  type: XformRadio
                                },
                                fdSysNumber: {},
                                type: XformRadio,
                                showStatus: 'readOnly'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dbq88pweuhyc}', '性别'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dbq88pweuhyc}', '性别'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dytm2k66g0lb}', '邮箱'),
                                maxLength: 100,
                                name: 'fdEmail',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d5otd4og7e3a}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                fdSysNumber: {},
                                type: XformInput,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dytm2k66g0lb}', '邮箱'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dytm2k66g0lb}', '邮箱'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d2vfscw9hlco}', '手机号'),
                                maxLength: 100,
                                name: 'fdMobile',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d11220hthujig}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                fdSysNumber: {},
                                type: XformInput,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d2vfscw9hlco}', '手机号'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9d2vfscw9hlco}', '手机号'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: CMSXformRelation,
                              controlProps: {
                                apiRequest: apiPostInfo.listPostInfo({}),
                                showFdName: 'fdPostName',
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dvrnp3vacbdc}', '岗位'),
                                name: 'fdPost',
                                renderMode: 'select',
                                direction: 'column',
                                rowCount: 3,
                                modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                                isForwardView: 'no',
                                desktop: {
                                  type: CMSXformRelation
                                },
                                relationCfg: {
                                  appCode: '1g44id6v0w8wk87w1tojjnkomh1ni2cebpw0',
                                  xformName: '岗位信息',
                                  modelId: '1g44id73fw8wkc6w27c0s7933o6cop37few0',
                                  tableType: 'main',
                                  tableName: 'mk_model_202205280ut12',
                                  showFields: '$岗位名称$',
                                  refFieldName: '$fd_post_name$'
                                },
                                fdSysNumber: {},
                                type: CMSXformRelation,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dvrnp3vacbdc}', '岗位'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dvrnp3vacbdc}', '岗位'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            },
                            {
                              type: XformInput,
                              controlProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dpblxl89qfo9}', '各类系统默认账号'),
                                maxLength: 100,
                                name: 'fdSystemAccount',
                                placeholder: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dsgb0dqohvcr}', '请输入'),
                                desktop: {
                                  type: XformInput
                                },
                                fdSysNumber: {},
                                type: XformInput,
                                showStatus: 'edit'
                              },
                              labelProps: {
                                title: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dpblxl89qfo9}', '各类系统默认账号'),
                                desktop: {
                                  layout: 'vertical'
                                }
                              },
                              label: fmtMsg(':cmsStaffEntrance.form.!{l47uub9dpblxl89qfo9}', '各类系统默认账号'),
                              options: {
                                validateRules: {
                                  required: true,
                                  message: fmtMsg(':required', '内容不能为空')
                                }
                              }
                            }
                          ]}
                          canAddRow={true}
                          canDeleteRow={true}
                          canImport={false}
                          canExport={false}
                          canExpand={false}
                          showStatus="edit"
                        ></XformDetailTable>
                      </Form.Item>
                    </XformFieldset>
                  </GridItem>
                  <GridItem
                    column={2}
                    row={11}
                    style={{
                      display: 'none'
                    }}
                    rowSpan={1}
                    columnSpan={1}
                  ></GridItem>
                </React.Fragment>
              ) : null
            }
            <GridItem column={1} row={12} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47v5nwx60spol1k2mr}', '预计到岗日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdComeDate'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l47v5nx4b662jj4pnrd}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={12} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47v5plwbbgd9v9lti}', '预计离岗日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdLeaveDate'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l47v5plycz81bn55jug}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={13} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47v5tsfqb7lmyilvtp}', '优先级')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdPriority'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47v749ebtsm7tkwvg9}', '高'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47v749fispc1sckdc}', '中'),
                        value: '2'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47v749fs9zznp9bzw9}', '低'),
                        value: '3'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={13}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={14} columnSpan={2} rowSpan={1}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol1j39ya'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsStaffEntrance.form.!{l47v9sxmgj8dir4egol}', '资源、账号、权限开通')}
                    controlValueStyle={{
                      fontWeight: 'bold'
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={14}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={15} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l47vah7yn9f2xm4kg2r}', '是否需要云主机账号')}
                layout={'horizontal'}
                help={fmtMsg(':cmsStaffEntrance.form.!{l47vfj0h5w1jnx4h7bm}', '（除苹果MAC机器外都要申请云主机）')}
                required={true}
              >
                <Form.Item
                  name={'fdCloudHost'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47vah86nuc10jznin}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47vah8bhla1kfguv54}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    controlTip={fmtMsg(
                      ':cmsStaffEntrance.form.!{l47vfj0h5w1jnx4h7bm}',
                      '（除苹果MAC机器外都要申请云主机）'
                    )}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={15}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={16} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482nsax4701h2qqkpk}', '是否需要悟空账号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdWukong'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483blgeq8rb0ssep7}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483blgdysjrk97nwfq}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={16} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482nufstu97ks4u25}', '是否需要码云账号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdGitee'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483bi2lhxnv686lma}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483bi2k8f7e2f87iqc}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={17} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482nw3zmlt617j4tmi}', '是否需要物理机')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdPhysicalMachine'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483bd07kapet31qv7}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483bd06kn8kkx4u8l}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={17} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482pgo8cd0h1sdqde}', '具体原因')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSpecificReason'}
                  rules={[
                    {
                      validator: lengthValidator(500)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l482pgock1xi6mp1vv}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>

            <GridItem column={1} row={18} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482peikh2dws298nmn}', '是否需要coding账号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdCoding'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483b8reid8079pnngg}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483b8rd5w0ex4u1cnk}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={18}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={19} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482nz2vtk08rczjmp}', '是否需要桌面助手账号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdDesktopAide'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483b4axnwvnwbvwmg}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483b4aw62250ecg8bo}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={19}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={20} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482sd8f5o2ezowr4cd}', '是否需要VPN')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdVpn'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4839pqyyvt0zfsym4}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4839pqxxirscdum7en}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={20} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482sf4jla56zux83gm}', '是否需要开通网络权限')}
                layout={'horizontal'}
                help={fmtMsg(':cmsStaffEntrance.form.!{l4dhxzkriipb2ev3048}', '(使用云主机一般无需额外开通网络权限)')}
                required={true}
              >
                <Form.Item
                  name={'fdNetworkPrem'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483auz7fdoryp397la}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l483auz7dctbx7vyj5}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    controlTip={fmtMsg(
                      ':cmsStaffEntrance.form.!{l4dhxzkriipb2ev3048}',
                      '(使用云主机一般无需额外开通网络权限)'
                    )}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={21} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482sh1j6m8hzuxviel}', '是否需要工位')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdStation'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4838nr85dnpaffekrv}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4838nr77ksqe0q7seb}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                    onChange={(v) => setStationVis(v)}
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            {
              console.log('stationVis', stationVis)

            }
            {
              stationVis === '1' ? (
                <React.Fragment>
                  <GridItem column={2} row={21} rowSpan={1} columnSpan={1}>
                    <XformFieldset
                      labelTextAlign={'left'}
                      mobileContentAlign={'right'}
                      title={fmtMsg(':cmsStaffEntrance.form.!{l4dhyr0daw870ql51wr}', '工位地点')}
                      layout={'horizontal'}
                    >
                      <Form.Item
                        name={'fdStationAddress'}
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
                              label: fmtMsg(':cmsStaffEntrance.form.!{l4dhyr0n42xi9zwiozl}', '深圳'),
                              value: 'sz'
                            },
                            {
                              label: fmtMsg(':cmsStaffEntrance.form.!{l4dhyr0tueb2u2axp4}', '武汉'),
                              value: 'wh'
                            }
                          ]}
                          rowCount={3}
                          direction={'column'}
                          serialType={'empty'}
                          optionSource={'custom'}
                          showStatus="edit"
                        ></XformRadio>
                      </Form.Item>
                    </XformFieldset>
                  </GridItem>
                  <GridItem
                    column={2}
                    row={21}
                    rowSpan={1}
                    columnSpan={1}
                    style={{
                      display: 'none'
                    }}
                  ></GridItem>
                </React.Fragment>
              ) : null
            }
            <GridItem column={1} row={22} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482tzs47za4h2j5hxr}', '是否需要门禁')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdEntranceGuard'}
                  rules={[
                    {
                      validator: lengthValidator(50)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l482tzsbzdit39nzk6j}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l482tzshvt438g3rkus}', '否'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={22} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482v2yuetsjeqv3onq}', '门禁范围')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdEntranceGuardScope'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformCheckbox
                    {...sysProps}
                    multi={true}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpb5radf8hwwkf}', '威新1楼'),
                        value: '01'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpc1zddlgsinkc}', '威新4楼'),
                        value: '04'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpdijeevxs3fu}', '威新5楼'),
                        value: '05'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpejzvzonhvp5}', '威新6楼'),
                        value: '06'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpaak2p3yrhypi}', '武汉301'),
                        value: '301'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l4di1lpbhkisdkqss8}', '武汉302'),
                        value: '302'
                      }
                    ]}
                    rowCount={8}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformCheckbox>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={22}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={23} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482vgpujftrilq2m6q}', '驻场原因')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdOnSiteReason'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformCheckbox
                    {...sysProps}
                    multi={true}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l48348h3dhp3d1m4ssh}', '代码(知识产权)保护'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l48348h5ln4q86gq93n}', '数据安全'),
                        value: '2'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l48348h50xpyfw96jix}', '集成测试'),
                        value: '3'
                      },
                      {
                        label: fmtMsg(':cmsStaffEntrance.form.!{l48348h67i3abzl71io}', '响应及时性'),
                        value: '4'
                      }
                    ]}
                    rowCount={5}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformCheckbox>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={23}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={2}
              row={23}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={24} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482w3gv0iehzw5tmva7}', '具体说明')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSpecify'}
                  rules={[
                    {
                      validator: lengthValidator(500)
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffEntrance.form.!{l482w3gzhs16kg22ni6}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={24}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={2}
              row={24}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={21}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={25} rowSpan={1} columnSpan={2}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColLdxp2n'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsStaffEntrance.form.!{l482wwj1opgyw8jrtzh}', '供应商上传资料')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      color: 'rgba(0,0,0,1)'
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColY3kagp'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsStaffEntrance.form.!{l482yeygbgd7o2bh3cm}',
                      '（需分别上传包含“身份证”、“保密承诺书签字”字样的扫描）'
                    )}
                    controlValueStyle={{
                      color: 'rgba(208,2,27,1)'
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={25}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={26} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l4830o1sjl5qofdcw48}', '模板下载')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdAttTemplate'}>
                  <Upload
                    mode='file'
                    fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffEntrance'
                    multiple={false}
                    fdEntityKey='fdAttTemplate'
                    operation={{ edit: false, preview: false, download: true, print: false }}
                    uploadMode={'list'}
                  />
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={26}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            {/* <GridItem column={1} row={27} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffEntrance.form.!{l482x9oheg8kfwghnzk}', '资料上传')}
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
                  <Upload
                    mode='file'
                    fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffEntrance'
                    multiple={false}
                    fdEntityKey='fdAtt'
                    operation={{ edit: false, preview: false, download: false,print:false }}
                  />
                </Form.Item>
              </XformFieldset>
            </GridItem> */}
            <GridItem
              column={2}
              row={27}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={20}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
