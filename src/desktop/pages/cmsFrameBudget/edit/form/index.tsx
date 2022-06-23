import React, { useRef, createRef } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/data-base-shared/formHooks'
import XformAppearance from '@/desktop/components/base-data/XformAppearance'
import LayoutGrid from '@/desktop/components/base-data/LayoutGrid'
import GridItem from '@/desktop/components/base-data/GridItem'
import XformDescription from '@/desktop/components/base-data/XformDescription'
import XformFieldset from '@/desktop/components/base-data/XformFieldset'
import XformDatetime from '@/desktop/components/base-data/XformDatetime'
import XformDetailTable from '@/desktop/components/base-data/XformDetailTable'
// import XformRelation from '@/desktop/components/form/XformRelation'
import XformMoney from '@/desktop/components/base-data/XformMoney'
import CMSXformRelation from '@/desktop/components/base-data/cms/CMSXformRelation'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsFrameBudgetDetail: createRef() as any
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
                <Form.Item name={'fdColFca808'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsFrameBudget.form.!{l3o3fbngwpazf90fn1f}', '框架预算')}
                    controlValueStyle={{
                      fontWeight: 'bold',
                      fontSize: 20
                    }}
                    showStatus="edit"
                  ></XformDescription>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={2} rowSpan={1} columnSpan={2}></GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={2}>
              <XformFieldset
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudget.form.!{l3o3g8xppu0i6x45lh}', '预算年度')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item name={'fdBudgetYear'}>
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudget.form.!{l3o3g8xxtir389moi9d}', '请输入')}
                    dataPattern={'yyyy'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudget.form.!{l3o3j5xkrirvukco55d}', '预算执行开始日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdStartDate'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudget.form.!{l3o3j5xnkjsw4iw8j58}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={4} rowSpan={2} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsFrameBudget.form.!{l3o3j76lvrvcuw25bq}', '预算执行结束日期')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdEndDate'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformDatetime
                    {...sysProps}
                    placeholder={fmtMsg(':cmsFrameBudget.form.!{l3o3j76os1klw6jdmxf}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
                  ></XformDatetime>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={2}>
              <XformFieldset>
                <Form.Item
                  name={'cmsFrameBudgetDetail'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsFrameBudgetDetail.current
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
                    $$ref={detailForms.current.cmsFrameBudgetDetail}
                    $$tableType="detail"
                    $$tableName="cmsFrameBudgetDetail"
                    title={fmtMsg(':cmsFrameBudget.form.!{l3o3jyt5yg2968at9nq}', '明细表1')}
                    defaultRowNumber={0}
                    mobileRender={['simple']}
                    pcSetting={['pagination']}
                    showNumber={true}
                    layout={'vertical'}
                    hiddenLabel={true}
                    columns={[
                      {
                        type: CMSXformRelation,
                        controlProps: {
                          title: fmtMsg(':cmsFrameBudget.form.!{l3o3kgyfdq94ksbejzj}', '所属框架'),
                          name: 'fdFrame',
                          direction: 'column',
                          rowCount: 3,
                          modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                          isForwardView: 'no',
                          desktop: {
                            type: CMSXformRelation
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
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsFrameBudget.form.!{l3o3kgyfdq94ksbejzj}', '所属框架'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsFrameBudget.form.!{l3o3kgyfdq94ksbejzj}', '所属框架'),
                        // options: {
                        //   validateRules: {
                        //     required: true,
                        //     message: fmtMsg(':required', '内容不能为空')
                        //   }
                        // }
                      },
                      {
                        type: XformMoney,
                        controlProps: {
                          title: fmtMsg(':cmsFrameBudget.form.!{l3o3kj1k0z4fsvjjuaw}', '预算金额（万元）'),
                          name: 'fdBudgetAmount',
                          placeholder: fmtMsg(':cmsFrameBudget.form.!{l3o3kj1ojsa7qw2486i}', '请输入'),
                          precision: 2,
                          desktop: {
                            type: XformMoney
                          },
                          type: XformMoney,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsFrameBudget.form.!{l3o3kj1k0z4fsvjjuaw}', '预算金额（万元）'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsFrameBudget.form.!{l3o3kj1k0z4fsvjjuaw}', '预算金额（万元）'),
                        // options: {
                        //   validateRules: {
                        //     required: true,
                        //     message: fmtMsg(':required', '内容不能为空')
                        //   }
                        // }
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
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
