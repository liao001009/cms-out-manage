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
import XformRelation from '@/desktop/components/supplier/XformRelation'
import XformDetailTable from '@/desktop/components/supplier/XformDetailTable'
import XformMoney from '@/desktop/components/supplier/XformMoney'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsSupplierPostPriceDe: createRef() as any
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
  const { onValuesChange, ...sysProps } = useSystem({
    props,
    form,
    detailForms
  })
  return (
    <div className="lui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance>
          <LayoutGrid columns={1} rows={3}>
            <GridItem
              column={1}
              row={1}
              style={{
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <XformFieldset compose={true}>
                <Form.Item name={'fdColVfw35c'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierPostPrice.form.!{l3ijwthh29rbcu28v0f}', '供应商岗位价格')}
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
                title={fmtMsg(':cmsSupplierPostPrice.form.!{l3ijy44u2dskj1ubuq3}', '供应商名称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdSupplier'}>
                  <XformRelation
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
                          name: 'fd_cooperation_status',
                          label: '供应商合作状态'
                        }
                      ],
                      filters: [],
                      isListThrough: true
                    }}
                    showStatus="edit"
                  ></XformRelation>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3}>
              <XformFieldset>
                <Form.Item
                  name={'cmsSupplierPostPriceDe'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsSupplierPostPriceDe.current
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
                    $$ref={detailForms.current.cmsSupplierPostPriceDe}
                    $$tableType="detail"
                    $$tableName="cmsSupplierPostPriceDe"
                    title={fmtMsg(':cmsSupplierPostPrice.form.!{l3ijzx11zmu6abkktgk}', '明细表1')}
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
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik2so5ido05litgh}', '岗位名称'),
                          name: 'fdPost',
                          renderMode: 'singlelist',
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
                            appCode: '1g3bqa9aqwjk0w1ks2w1lnvus8toemcp33w0',
                            xformName: '岗位信息',
                            modelId: '1g44id73fw8wkc6w27c0s7933o6cop37few0',
                            tableType: 'main',
                            tableName: 'mk_model_202205280ut12',
                            showFields: '$岗位名称$',
                            refFieldName: '$fd_post_name$'
                          },
                          type: XformRelation,
                          direction: 'column',
                          rowCount: 3,
                          datasource: {
                            queryCollection: {
                              linkType: '$and',
                              query: []
                            },
                            sorters: [],
                            columns: [
                              {
                                name: 'fd_post_name',
                                label: '岗位名称'
                              },
                              {
                                name: 'fdFrame',
                                label: '框架类型'
                              }
                            ],
                            filters: [],
                            isListThrough: true
                          },
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik2so5ido05litgh}', '岗位名称'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik2so5ido05litgh}', '岗位名称'),
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
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3meh1fipx4pk8eqr7}', '所属框架'),
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
                            appCode: '1g3bqa9aqwjk0w1ks2w1lnvus8toemcp33w0',
                            xformName: '框架信息',
                            modelId: '1g44id731w8wkbow1ug79a31094ejk3253w0',
                            tableType: 'main',
                            tableName: 'mk_model_20220528mgn2n',
                            showFields: '$名称$',
                            refFieldName: '$fd_name$'
                          },
                          type: XformRelation,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3meh1fipx4pk8eqr7}', '所属框架'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierPostPrice.form.!{l3meh1fipx4pk8eqr7}', '所属框架'),
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
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik31j0lhv5eup140p}', '级别'),
                          name: 'fdLevel',
                          renderMode: 'select',
                          direction: 'column',
                          rowCount: 3,
                          modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
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
                            appCode: '1g3bqa9aqwjk0w1ks2w1lnvus8toemcp33w0',
                            xformName: '级别信息',
                            modelId: '1g44id754w8wkckw3d22a8n2po5d0mqkrlw0',
                            tableType: 'main',
                            tableName: 'mk_model_20220528ue80k',
                            showFields: '$级别名称$',
                            refFieldName: '$fd_level_name$'
                          },
                          type: XformRelation,
                          isForwardView: 'no',
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik31j0lhv5eup140p}', '级别'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik31j0lhv5eup140p}', '级别'),
                        options: {
                          validateRules: {
                            required: true,
                            message: fmtMsg(':required', '内容不能为空')
                          }
                        }
                      },
                      {
                        type: XformMoney,
                        controlProps: {
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik3516rienjv9ya7}', '人月单价（元）'),
                          name: 'fdPrice',
                          placeholder: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik351ad34xgmxct8}', '请输入'),
                          precision: 2,
                          desktop: {
                            type: XformMoney
                          },
                          type: XformMoney,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik3516rienjv9ya7}', '人月单价（元）'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierPostPrice.form.!{l3ik3516rienjv9ya7}', '人月单价（元）'),
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
