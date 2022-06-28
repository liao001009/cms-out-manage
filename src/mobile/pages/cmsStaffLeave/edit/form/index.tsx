import React, { useRef, createRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/mobile/shared/formHooks'
import XformAppearance from '@/mobile/components/form/XformAppearance'
import XformMDescription from '@/mobile/components/form/XformMDescription'
import XformFieldset from '@/mobile/components/form/XformFieldset'
import XformMInput from '@/mobile/components/form/XformMInput'
import XformMAddress from '@/mobile/components/form/XformMAddress'
import XformMDatetime from '@/mobile/components/form/XformMDatetime'
import XformMRelation from '@/mobile/components/form/XformMRelation'
import XformMSelect from '@/mobile/components/form/XformMSelect'
import XformMDetailTable from '@/mobile/components/form/XformMDetailTable'
import XformRelation from '@/mobile/components/form/XformRelation'
import XformInput from '@/mobile/components/form/XformInput'
import XformSelect from '@/mobile/components/form/XformSelect'
import XformMRadio from '@/mobile/components/form/XformMRadio'
import XformRadio from '@/mobile/components/form/XformRadio'
import XformMTextarea from '@/mobile/components/form/XformMTextarea'
import XformTextarea from '@/mobile/components/form/XformTextarea'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsStaffLeaveDetail: createRef() as any
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
    <div className="mui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance>
          <XformFieldset compose={true}>
            <Form.Item name={'fdColW8681j'}>
              <XformMDescription
                {...sysProps}
                defaultTextValue={fmtMsg(':cmsStaffLeave.form.!{l47tccxkxgt8l4u79b}', '离场申请')}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMDescription>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47tdsgnsqlan2qugs}', '主题')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdSubject'}
              rules={[
                {
                  validator: lengthValidator(100)
                }
              ]}
            >
              <XformMInput
                {...sysProps}
                placeholder={fmtMsg(':cmsStaffLeave.form.!{l47tdsgrggkbannq8wq}', '请输入')}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMInput>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.fdCreator', '创建者')}
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
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['8'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.fdCreatorDept', '创建者部门')}
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
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['8'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47tew2ifoxlw7bkh0n}', '联系电话')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdMobile'}
              rules={[
                {
                  validator: lengthValidator(100)
                }
              ]}
            >
              <XformMInput
                {...sysProps}
                placeholder={fmtMsg(':cmsStaffLeave.form.!{l47tew2lx3mngvk63i}', '请输入')}
                layout={'horizontal'}
                // defaultValueFormulaVO={{
                //   type: 'Eval',
                //   script: "${func.sysorg.getOrgAttributeVal}(${data.biz.fd_creator}, 8,'fdMobileNo')",
                //   vo: {
                //     mode: 'formula',
                //     content: "#查找组织属性#($离场申请（含外包人员评价）.创建人[内置]$, 8,'fdMobileNo')"
                //   }
                // }}
                showStatus="edit"
              ></XformMInput>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.fdCreateTime', '创建时间')}
            layout={'horizontal'}
          >
            <Form.Item name={'fdCreateTime'}>
              <XformMDatetime
                {...sysProps}
                placeholder={'请输入'}
                dataPattern={'yyyy-MM-dd'}
                showStatus="edit"
              ></XformMDatetime>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47tsmjxv026iy3m5pq}', '所属系统/项目')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item name={'fdProject'}>
              <XformMRelation
                {...sysProps}
                renderMode={'singlelist'}
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
                layout={'horizontal'}
                relationCfg={{
                  appCode: '1g547src8wnw4ou4lwnufacg2vq3pjm333w0',
                  xformName: '项目库',
                  modelId: '1g547tfatwnw4ou5nw3q1ioee2jqfk8g3dw0',
                  tableType: 'main',
                  tableName: 'mk_model_20220609m9bm1',
                  showFields: '$项目名称$',
                  refFieldName: '$fd_name$'
                }}
                datasource={{
                  queryCollection: {
                    linkType: '$and',
                    query: []
                  },
                  sorters: [],
                  columns: [
                    {
                      name: 'fd_name',
                      label: '项目名称'
                    },
                    {
                      name: 'fd_code',
                      label: '项目编号'
                    },
                    {
                      name: 'fd_frame',
                      label: '项目所属框架'
                    },
                    {
                      name: 'fdProjectNature',
                      label: '项目性质'
                    },
                    {
                      name: 'fdBelongDept',
                      label: '所属部门'
                    },
                    {
                      name: 'fdBelongTeam',
                      label: '所属组/团队'
                    },
                    {
                      name: 'fdProjectPrincipal',
                      label: '项目负责人'
                    },
                    {
                      name: 'fdInnerPrincipal',
                      label: '内部责任人'
                    },
                    {
                      name: 'fd_project_date',
                      label: '项目立项时间'
                    },
                    {
                      name: 'fd_start_date',
                      label: '预计开始时间'
                    },
                    {
                      name: 'fd_end_date',
                      label: '预计结束日期'
                    }
                  ],
                  filters: [
                    {
                      name: 'fd_name',
                      label: '项目名称'
                    },
                    {
                      name: 'fd_code',
                      label: '项目编号'
                    },
                    {
                      name: 'fd_frame',
                      label: '项目所属框架'
                    },
                    {
                      name: 'fdProjectNature',
                      label: '项目性质'
                    },
                    {
                      name: 'fdBelongDept',
                      label: '所属部门'
                    },
                    {
                      name: 'fdBelongTeam',
                      label: '所属组/团队'
                    },
                    {
                      name: 'fdProjectPrincipal',
                      label: '项目负责人'
                    },
                    {
                      name: 'fdInnerPrincipal',
                      label: '内部责任人'
                    },
                    {
                      name: 'fd_project_date',
                      label: '项目立项时间'
                    },
                    {
                      name: 'fd_start_date',
                      label: '预计开始时间'
                    },
                    {
                      name: 'fd_end_date',
                      label: '预计结束日期'
                    }
                  ],
                  isListThrough: true,
                  viewId: '1g547tfgewnw4ou7vw1soedp51pkt8us2bw0'
                }}
                outParams={{
                  params: [
                    {
                      sourceField: {
                        fdType: 'address',
                        fdName: 'fdProjectPrincipal',
                        tableName: 'main'
                      },
                      targetField: {
                        fdType: 'address',
                        fdName: 'fdProjectPrincipal',
                        tableName: 'main'
                      }
                    },
                    {
                      sourceField: {
                        fdType: 'address',
                        fdName: 'fdInnerPrincipal',
                        tableName: 'main'
                      },
                      targetField: {
                        fdType: 'address',
                        fdName: 'fdInnerPrincipal',
                        tableName: 'main'
                      }
                    },
                    {
                      sourceField: {
                        fdType: 'address',
                        fdName: 'fdBelongDept',
                        tableName: 'main'
                      },
                      targetField: {
                        fdType: 'address',
                        fdName: 'fdBelongDept',
                        tableName: 'main'
                      }
                    },
                    {
                      sourceField: {
                        fdType: 'address',
                        fdName: 'fdBelongTeam',
                        tableName: 'main'
                      },
                      targetField: {
                        fdType: 'address',
                        fdName: 'fdBelongTeam',
                        tableName: 'main'
                      }
                    },
                    {
                      sourceField: {
                        fdType: 'select',
                        fdName: 'fdProjectNature',
                        tableName: 'main'
                      },
                      targetField: {
                        fdType: 'select',
                        fdName: 'fdProjectNature',
                        tableName: 'main'
                      }
                    }
                  ]
                }}
                showStatus="edit"
              ></XformMRelation>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l4c4ekcd8kuc1d5n256}', '项目性质')}
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
              <XformMSelect
                {...sysProps}
                placeholder={fmtMsg(':cmsStaffLeave.form.!{l4c4ekcizq25wsebdeh}', '请输入')}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4fn859c17rdwyprj}', '项目外包'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4fn86c8xwk5xux2d}', '厂商实施'),
                    value: '2'
                  }
                ]}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMSelect>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47tv9c980rr18iqk8u}', '所属部门')}
            layout={'horizontal'}
          >
            <Form.Item name={'fdBelongDept'}>
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['2'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47tvd32luja2sqot3t}', '所属组/团队')}
            layout={'horizontal'}
          >
            <Form.Item name={'fdBelongTeam'}>
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['2'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l485c6iq7eqo22vs64v}', '项目负责人')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item name={'fdProjectPrincipal'}>
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['8'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                layout={'horizontal'}
                fdSysNumber={{}}
                label={fmtMsg(':cmsStaffLeave.form.!{l485c6iq7eqo22vs64v}', '项目负责人')}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l485c9auoq6hz0d4tvq}', '内部负责人')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item name={'fdInnerPrincipal'}>
              <XformMAddress
                {...sysProps}
                org={{
                  orgTypeArr: ['8'],
                  defaultValueType: 'null'
                }}
                range={'all'}
                preSelectType={'fixed'}
                layout={'horizontal'}
                fdSysNumber={{}}
                label={fmtMsg(':cmsStaffLeave.form.!{l485c9auoq6hz0d4tvq}', '内部负责人')}
                showStatus="edit"
              ></XformMAddress>
            </Form.Item>
          </XformFieldset>
          <XformFieldset>
            <Form.Item
              name={'cmsStaffLeaveDetail'}
              noStyle
              rules={[
                {
                  validator: (rule, value, callback) => {
                    detailForms.current.cmsStaffLeaveDetail.current
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
              <XformMDetailTable
                {...sysProps}
                $$ref={detailForms.current.cmsStaffLeaveDetail}
                $$tableType="detail"
                $$tableName="cmsStaffLeaveDetail"
                title={fmtMsg(':cmsStaffLeave.form.!{l47ubnidlwzsgmgcbxm}', '离场人员信息')}
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
                    type: XformMRelation,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ucie6axg62p00qnq}', '外包人员姓名'),
                      name: 'fdStaffName',
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
                      mobile: {
                        layout: 'vertical',
                        type: XformMRelation
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
                      outParams: {
                        params: [
                          {
                            sourceField: {
                              fdType: 'text',
                              fdName: 'fdNamePinyin',
                              tableName: 'cmsStaffLeaveDetail'
                            },
                            targetField: {
                              fdType: 'text',
                              fdName: 'fdNamePinyin',
                              tableName: 'main'
                            }
                          },
                          {
                            sourceField: {
                              fdType: 'text',
                              fdName: 'fdMobile',
                              tableName: 'cmsStaffLeaveDetail'
                            },
                            targetField: {
                              fdType: 'text',
                              fdName: 'fdMobile',
                              tableName: 'main'
                            }
                          },
                          {
                            sourceField: {
                              fdType: 'text',
                              fdName: 'fdEmail',
                              tableName: 'cmsStaffLeaveDetail'
                            },
                            targetField: {
                              fdType: 'text',
                              fdName: 'fdEmail',
                              tableName: 'main'
                            }
                          }
                        ]
                      },
                      datasource: {
                        queryCollection: {
                          linkType: '$and',
                          query: [
                            {
                              field: {
                                name: 'fd_status_info'
                              },
                              operator: {
                                value: '$neq'
                              },
                              value: {
                                format: 'fixed',
                                val: '3'
                              }
                            },
                            {
                              field: {
                                name: 'fd_status_info'
                              },
                              operator: {
                                value: '$neq'
                              },
                              value: {
                                format: 'fixed',
                                val: '4'
                              }
                            }
                          ]
                        },
                        sorters: [],
                        columns: [
                          {
                            name: 'fd_name',
                            label: '姓名'
                          },
                          {
                            name: 'fd_skill',
                            label: '技能'
                          },
                          {
                            name: 'fd_post',
                            label: '岗位'
                          },
                          {
                            name: 'fd_highest_education',
                            label: '最高学历'
                          },
                          {
                            name: 'fd_major',
                            label: '专业'
                          },
                          {
                            name: 'fd_supplier',
                            label: '组织信息/所属供应商'
                          },
                          {
                            name: 'fd_work_address',
                            label: '工作地'
                          },
                          {
                            name: 'fdProject',
                            label: '当前项目'
                          },
                          {
                            name: 'fd_inner_team',
                            label: '当前所属招证内部团队'
                          }
                        ],
                        filters: [
                          {
                            name: 'fd_name',
                            label: '姓名'
                          },
                          {
                            name: 'fd_skill',
                            label: '技能'
                          },
                          {
                            name: 'fd_post',
                            label: '岗位'
                          },
                          {
                            name: 'fd_highest_education',
                            label: '最高学历'
                          },
                          {
                            name: 'fd_major',
                            label: '专业'
                          },
                          {
                            name: 'fd_supplier',
                            label: '组织信息/所属供应商'
                          },
                          {
                            name: 'fd_entry_work_date',
                            label: '参加工作日期'
                          },
                          {
                            name: 'fd_birth_date',
                            label: '出生日期'
                          }
                        ],
                        isListThrough: true
                      },
                      type: XformRelation,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ucie6axg62p00qnq}', '外包人员姓名'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l47ucie6axg62p00qnq}', '外包人员姓名'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMInput,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                      maxLength: 100,
                      name: 'fdNamePinyin',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufatfw9bq6eb3ll}', '请输入'),
                      mobile: {
                        layout: 'vertical',
                        type: XformMInput
                      },
                      type: XformInput,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMInput,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                      maxLength: 100,
                      name: 'fdMobile',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufnh0dgokdxysj36}', '请输入'),
                      mobile: {
                        layout: 'vertical',
                        type: XformMInput
                      },
                      type: XformInput,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMInput,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                      maxLength: 100,
                      name: 'fdEmail',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufjyyxv7t9gzeju}', '请输入'),
                      mobile: {
                        layout: 'vertical',
                        type: XformMInput
                      },
                      type: XformInput,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMInput,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                      maxLength: 100,
                      name: 'fdSystemAccount',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l47uk9k0ylj9507ayb}', '请输入'),
                      mobile: {
                        layout: 'vertical',
                        type: XformMInput
                      },
                      type: XformInput,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMSelect,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c4kldeq93hjsg361d}', '离场原因'),
                      maxLength: 50,
                      name: 'fdLeaveReason',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l4c4kldgtm46ieyh9k}', '请输入'),
                      options: [
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c4o04xs7jpy7j5t3}', '个人离职'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c4o04xyvitdfobqih}', '项目结束'),
                          value: '2'
                        },
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c4o04xhmcr44b9dua}', '不胜任退回'),
                          value: '3'
                        },
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c4o04x82w75lqximv}', '供应商主动撤回'),
                          value: '4'
                        }
                      ],
                      optionSource: 'custom',
                      mobile: {
                        layout: 'vertical',
                        type: XformMSelect
                      },
                      type: XformSelect,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c4kldeq93hjsg361d}', '离场原因'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4kldeq93hjsg361d}', '离场原因'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMRadio,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c57z05apvjrkx66v5}', '项目负责人评价：是否推荐'),
                      maxLength: 50,
                      name: 'fdIsRecommend',
                      options: [
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c57z09nljamtqa6p8}', '是'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsStaffLeave.form.!{l4c57z0gitm3oceic8}', '否'),
                          value: '0'
                        }
                      ],
                      rowCount: 3,
                      direction: 'column',
                      serialType: 'empty',
                      optionSource: 'custom',
                      mobile: {
                        layout: 'vertical',
                        type: XformMRadio
                      },
                      type: XformRadio,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c57z05apvjrkx66v5}', '项目负责人评价：是否推荐'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c57z05apvjrkx66v5}', '项目负责人评价：是否推荐'),
                    options: {
                      validateRules: {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    }
                  },
                  {
                    type: XformMTextarea,
                    controlProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c4l0i9wr8qoee1tr}', '项目负责人评价：评语'),
                      maxLength: 2000,
                      name: 'fdProjectPrincipalEval',
                      placeholder: fmtMsg(':cmsStaffLeave.form.!{l4c4l0idb5sq9ddym3r}', '请输入'),
                      height: 3,
                      mobile: {
                        layout: 'vertical',
                        type: XformMTextarea
                      },
                      type: XformTextarea,
                      showStatus: 'edit'
                    },
                    labelProps: {
                      title: fmtMsg(':cmsStaffLeave.form.!{l4c4l0i9wr8qoee1tr}', '项目负责人评价：评语'),
                      mobile: {
                        layout: 'vertical'
                      }
                    },
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4l0i9wr8qoee1tr}', '项目负责人评价：评语'),
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
                canImport={true}
                showStatus="edit"
              ></XformMDetailTable>
            </Form.Item>
          </XformFieldset>
          <XformFieldset compose={true}>
            <Form.Item name={'fdCol1j39ya'}>
              <XformMDescription
                {...sysProps}
                defaultTextValue={fmtMsg(':cmsStaffLeave.form.!{l47v9sxmgj8dir4egol}', '资源、账号、权限注销')}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMDescription>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482nufstu97ks4u25}', '码云账号')}
            layout={'horizontal'}
          >
            <Form.Item
              name={'fdGitee'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483bi2lhxnv686lma}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483bi2k8f7e2f87iqc}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482nsax4701h2qqkpk}', '悟空账号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdWukong'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483blgeq8rb0ssep7}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483blgdysjrk97nwfq}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482peikh2dws298nmn}', 'coding账号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdCoding'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483b8reid8079pnngg}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483b8rd5w0ex4u1cnk}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482nw3zmlt617j4tmi}', '物理机主机设备编号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdPhysicalMachineNo'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483bd07kapet31qv7}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483bd06kn8kkx4u8l}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l47vah7yn9f2xm4kg2r}', '云主机账号')}
            layout={'horizontal'}
            help={fmtMsg(':cmsStaffLeave.form.!{l47vfj0h5w1jnx4h7bm}', '')}
            required={true}
          >
            <Form.Item
              name={'fdCloudHost'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l47vah86nuc10jznin}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l47vah8bhla1kfguv54}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                controlTip={fmtMsg(':cmsStaffLeave.form.!{l47vfj0h5w1jnx4h7bm}', '')}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l4c4v4ns88vz6afxleb}', '云主机设备编号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdCloudHostNo'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4v4nxg5baj7276up}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4c4v4o3z5ckp8b45mj}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482nz2vtk08rczjmp}', '桌面助手账号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdDesktopAide'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483b4axnwvnwbvwmg}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483b4aw62250ecg8bo}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482sd8f5o2ezowr4cd}', 'VPN账号')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdVpn'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4839pqyyvt0zfsym4}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4839pqxxirscdum7en}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482sf4jla56zux83gm}', '网络权限')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdNetworkPrem'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483auz7fdoryp397la}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l483auz7dctbx7vyj5}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482tzs47za4h2j5hxr}', '门禁')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdEntranceGuard'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l482tzsbzdit39nzk6j}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l482tzshvt438g3rkus}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482sh1j6m8hzuxviel}', '工位')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdStation'}
              rules={[
                {
                  validator: lengthValidator(50)
                }
              ]}
            >
              <XformMRadio
                {...sysProps}
                options={[
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4838nr85dnpaffekrv}', '是'),
                    value: '1'
                  },
                  {
                    label: fmtMsg(':cmsStaffLeave.form.!{l4838nr77ksqe0q7seb}', '不涉及'),
                    value: '0'
                  }
                ]}
                rowCount={3}
                direction={'column'}
                serialType={'empty'}
                optionSource={'custom'}
                layout={'horizontal'}
                showStatus="edit"
              ></XformMRadio>
            </Form.Item>
          </XformFieldset>
          <XformFieldset
            labelTextAlign={'left'}
            mobileContentAlign={'right'}
            title={fmtMsg(':cmsStaffLeave.form.!{l482w3gv0iehzw5tmva7}', '具体说明')}
            layout={'horizontal'}
            required={true}
          >
            <Form.Item
              name={'fdSpecify'}
              rules={[
                {
                  validator: lengthValidator(500)
                }
              ]}
            >
              <XformMInput
                {...sysProps}
                placeholder={fmtMsg(':cmsStaffLeave.form.!{l482w3gzhs16kg22ni6}', '请输入')}
                showStatus="edit"
              ></XformMInput>
            </Form.Item>
          </XformFieldset>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
