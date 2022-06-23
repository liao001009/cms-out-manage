import React, { useRef, createRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/supplier-shared/formHooks'
import XformAppearance from '@/desktop/components/supplier/XformAppearance'
import LayoutGrid from '@/desktop/components/supplier/LayoutGrid'
import GridItem from '@/desktop/components/supplier/GridItem'
import XformDescription from '@/desktop/components/supplier/XformDescription'
import XformFieldset from '@/desktop/components/supplier/XformFieldset'
import XformInput from '@/desktop/components/supplier/XformInput'
import XformAddress from '@/desktop/components/supplier/XformAddress'
import XformDatetime from '@/desktop/components/supplier/XformDatetime'
import XformDetailTable from '@/desktop/components/supplier/XformDetailTable'
import XformRelation from '@/desktop/components/supplier/XformRelation'
import XformSelect from '@/desktop/components/supplier/XformSelect'
import XformNumber from '@/desktop/components/supplier/XformNumber'
import XformTextarea from '@/desktop/components/supplier/XformTextarea'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsStaffReviewUpDetail: createRef() as any
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
          <LayoutGrid columns={2} rows={4}>
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
                <Form.Item name={'fdColLwv0vp'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(
                      ':cmsStaffReviewUpgrade.form.!{l3n3rqhbnel7xfgj6p}',
                      '外包人员评审（调级）'
                    )}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3tdme4n276aie82o}', '主题')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSubject'}
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
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3tdmkvi88iyf5su}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffReviewUpgrade.fdCreator', '创建者')}
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
            <GridItem column={2} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffReviewUpgrade.fdCreateTime', '创建时间')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdCreateTime'}>
                  <XformDatetime {...sysProps} dataPattern={'yyyy-MM-dd'} showStatus="edit"></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={2}>
              <XformFieldset>
                <Form.Item
                  name={'cmsStaffReviewUpDetail'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsStaffReviewUpDetail.current
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
                    $$ref={detailForms.current.cmsStaffReviewUpDetail}
                    $$tableType="detail"
                    $$tableName="cmsStaffReviewUpDetail"
                    title={fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3w2qjbk89yx8grub}', '明细表1')}
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
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3yzhbo2xn9mkov6}', '供应商名称'),
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
                          type: XformRelation,
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
                                name: 'fd_org_code',
                                label: '组织机构代码'
                              },
                              {
                                name: 'fd_cooperation_status',
                                label: '供应商合作状态'
                              }
                            ],
                            filters: [],
                            isListThrough: true
                          },
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3yzhbo2xn9mkov6}', '供应商名称'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3yzhbo2xn9mkov6}', '供应商名称')
                      },
                      {
                        type: XformRelation,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3z1kfc220wrv66oi}', '姓名'),
                          name: 'fdStaff',
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
                          type: XformRelation,
                          relationCfg: {
                            appCode: '1g44id6eaw8wk0aw2kn8m6v35g3cmkig7ew0',
                            xformName: '外包人员信息',
                            modelId: '1g44id6odw8wk75wge0p5v1s9g7s02ppnpw0',
                            tableType: 'main',
                            tableName: 'mk_model_202205284tv70',
                            showFields: '$姓名$',
                            refFieldName: '$fd_col_9mzs5p$'
                          },
                          datasource: {
                            queryCollection: {
                              linkType: '$and',
                              query: []
                            },
                            sorters: [],
                            columns: [
                              {
                                name: 'fd_col_9mzs5p',
                                label: '姓名'
                              },
                              {
                                name: 'fdSupplier',
                                label: '组织信息/所属供应商'
                              },
                              {
                                name: 'fd_first_entrance_date',
                                label: '首次入场时间'
                              },
                              {
                                name: 'fd_last_upgrade_date',
                                label: '上次调级时间'
                              }
                            ],
                            filters: [
                              {
                                name: 'fd_col_9mzs5p',
                                label: '姓名'
                              },
                              {
                                name: 'fdSupplier',
                                label: '组织信息/所属供应商'
                              },
                              {
                                name: 'fd_first_entrance_date',
                                label: '首次入场时间'
                              },
                              {
                                name: 'fd_last_upgrade_date',
                                label: '上次调级时间'
                              }
                            ],
                            isListThrough: true,
                            viewId: '1g44id6ohw8wk76wa5mkjt12o13k43rk2kw0'
                          },
                          outParams: {
                            params: [
                              {
                                sourceField: {
                                  fdType: 'relation',
                                  fdName: 'fdSupplier',
                                  tableName: 'cmsStaffReviewUpDetail'
                                },
                                targetField: {
                                  fdType: 'relation',
                                  fdName: 'fdSupplier',
                                  tableName: 'main'
                                }
                              },
                              {
                                sourceField: {
                                  fdType: 'relation',
                                  fdName: 'fdPost',
                                  tableName: 'cmsStaffReviewUpDetail'
                                },
                                targetField: {
                                  fdType: 'relation',
                                  fdName: 'fdPost',
                                  tableName: 'main'
                                }
                              },
                              {
                                sourceField: {
                                  fdType: 'select',
                                  fdName: 'fdHighestEducation',
                                  tableName: 'cmsStaffReviewUpDetail'
                                },
                                targetField: {
                                  fdType: 'select',
                                  fdName: 'fdHighestEducation',
                                  tableName: 'main'
                                }
                              },
                              {
                                sourceField: {
                                  fdType: 'select',
                                  fdName: 'fdCurrentLevel',
                                  tableName: 'cmsStaffReviewUpDetail'
                                },
                                targetField: {
                                  fdType: 'select',
                                  fdName: 'fd_confirm_level',
                                  tableName: 'main'
                                }
                              }
                            ]
                          },
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3z1kfc220wrv66oi}', '姓名'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3n3z1kfc220wrv66oi}', '姓名'),
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
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3s55dzkh1h2xgc3qmi}', '岗位'),
                          name: 'fdPost',
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
                          type: XformRelation,
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
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3s55dzkh1h2xgc3qmi}', '岗位'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3s55dzkh1h2xgc3qmi}', '岗位')
                      },
                      {
                        type: XformSelect,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb91q4us8j5t2rkyd}', '最高学历'),
                          maxLength: 50,
                          name: 'fdHighestEducation',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb91q7vi4t09qtc6f}', '请输入'),
                          options: [
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbadfeou89k2k6d6p}', '高中'),
                              value: '1'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbadfelcahury8w5}', '专科'),
                              value: '2'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbadff6tzbkqyr09}', '本科'),
                              value: '3'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbadffynine98e9v}', '研究生'),
                              value: '4'
                            }
                          ],
                          optionSource: 'custom',
                          desktop: {
                            type: XformSelect
                          },
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb91q4us8j5t2rkyd}', '最高学历'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb91q4us8j5t2rkyd}', '最高学历')
                      },
                      {
                        type: XformNumber,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb94v34687jh19czy}', '工作年限'),
                          name: 'fdWorkYear',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb94v5khrdveqw90f}', '请输入'),
                          numberFormat: {
                            formatType: 'base'
                          },
                          desktop: {
                            type: XformNumber
                          },
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb94v34687jh19czy}', '工作年限'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sb94v34687jh19czy}', '工作年限')
                      },
                      {
                        type: XformSelect,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbb931ob9ia7fgn3j}', '当前级别'),
                          maxLength: 50,
                          name: 'fdCurrentLevel',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbb934fxuclwe3j1j}', '请输入'),
                          options: [
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbwxhcwv7u5rab4w}', '资深'),
                              value: '1'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbwximzo8o6s6we9}', '高级'),
                              value: '2'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbwxiv41f0teyrxb}', '中级'),
                              value: '3'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbwxiyi8xjd9w10p}', '初级'),
                              value: '4'
                            }
                          ],
                          optionSource: 'custom',
                          desktop: {
                            type: XformSelect
                          },
                          type: XformSelect,
                          showStatus: 'view'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbb931ob9ia7fgn3j}', '当前级别'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbb931ob9ia7fgn3j}', '当前级别')
                      },
                      {
                        type: XformTextarea,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbbl53wftpzuy1u4}', '调级说明'),
                          maxLength: 2000,
                          name: 'fdAdjustDesc',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbbl9iihg770o19b}', '请输入'),
                          height: 3,
                          desktop: {
                            type: XformTextarea
                          },
                          type: XformTextarea,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbbl53wftpzuy1u4}', '调级说明'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbbbl53wftpzuy1u4}', '调级说明'),
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
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbcsrt7celutm5fd8}', '调级结果'),
                          maxLength: 50,
                          name: 'fdAdjustResult',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbcsrv0e02hgauyon}', '请输入'),
                          options: [
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbexkbkv6ef6moh2c}', '资深'),
                              value: '1'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbexkcdiuk4ijpmw7}', '高级'),
                              value: '2'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbexkccdi2c52esb}', '中级'),
                              value: '3'
                            },
                            {
                              label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbexkdb7mrw7irnas}', '初级'),
                              value: '4'
                            }
                          ],
                          optionSource: 'custom',
                          desktop: {
                            type: XformSelect
                          },
                          type: XformSelect,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbcsrt7celutm5fd8}', '调级结果'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbcsrt7celutm5fd8}', '调级结果'),
                        options: {
                          validateRules: {
                            required: true,
                            message: fmtMsg(':required', '内容不能为空')
                          }
                        }
                      },
                      {
                        type: XformDatetime,
                        controlProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbe1y63kojk24t3zj}', '生效日期'),
                          name: 'fdEffectDate',
                          placeholder: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbe1y86xxe9axisdb}', '请输入'),
                          dataPattern: 'yyyy-MM-dd',
                          desktop: {
                            type: XformDatetime
                          },
                          type: XformDatetime,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbe1y63kojk24t3zj}', '生效日期'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffReviewUpgrade.form.!{l3sbe1y63kojk24t3zj}', '生效日期'),
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
                  ></XformDetailTable>
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
