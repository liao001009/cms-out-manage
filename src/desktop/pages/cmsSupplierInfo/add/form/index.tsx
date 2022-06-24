import React, { useRef, createRef, useState, useEffect } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/desktop/shared/formHooks-supplier'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformDescription from '@/desktop/components/XformDescription'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformInput from '@/desktop/components/XformInput'
import XformRadio from '@/desktop/components/XformRadio'
import XformTextarea from '@/desktop/components/XformTextarea'
import XformDetailTable from '@/desktop/components/XformDetailTable'
import XformSelect from '@/desktop/components/XformSelect'
import api from '@/api/cmsFrameInfo'

const MECHANISMNAMES = {}

const XForm = (props) => {
  const detailForms = useRef({
    cmsSupplierLinkman: createRef() as any
  })
  const { formRef: formRef } = props
  let { value: value } = props
  const [form] = Form.useForm()
  const [frameArr, setFrameArr] = useState<any>([])
  const init = async () => {
    try {
      const res = await api.listFrameInfo({})
      const newValue = res.data.content.map(i => {
        const item = {
          label: i.fdName,
          value: i.fdId
        }
        return item
      })
      setFrameArr(newValue)
      form.setFieldsValue({
        fdFrame: value.fdFrame.fdId
      })
    } catch (error) {
      console.warn('框架类型出错', error)
    }
  }
  useEffect(() => { init() }, [])
  value = {
    ...value,
    fdCooperationStatus: '1'
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
                <Form.Item name={'fdColDqya4q'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsSupplierInfo.form.!{l3i2m1rj7ofj5euqvkv}', '供应商信息')}
                    controlValueStyle={{
                      fontSize: 20,
                      fontWeight: 'bold'
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
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2mxnncrl27o7sw8}', '供应商名称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSupplierName'}
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
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3i2mxnsd72iksqmq3t}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={3} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2n52nsm2wx489otn}', '组织机构代码')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdOrgCode'}
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
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3i2n52qm7p7wzsqug}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={5} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2nisbl941j9tayi}', '供应商合作状态')}
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
                  <XformRadio
                    {...sysProps}
                    isView={'readOnly'}
                    options={[
                      {
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2t1y56ei7qcr1m9j}', '未签合同'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2t1y67injfpbkzfa}', '已签合同'),
                        value: '2'
                      },
                      {
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2t1y6wcs9zyxvqgs}', '合同过期'),
                        value: '3'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showContent={'selectedItem'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={4} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3o4pdwkhdk8l4atd}', '供应商简介')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdDesc'}
                  rules={[
                    {
                      validator: lengthValidator(2000)
                    }
                  ]}
                >
                  <XformTextarea
                    {...sysProps}
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3o4pdwozeldrxxyqkm}', '请输入')}
                    height={3}
                    showStatus="edit"
                  ></XformTextarea>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={6} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3me38ucc667r165wr}', '所属框架')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdFrame'}>
                  <XformSelect
                    {...sysProps}
                    placeholder={fmtMsg(':cmsProjectInfo.form.!{l47sfd3bplubk8x7ajm}', '请输入')}
                    options={frameArr}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformSelect>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2oerpzfu7yvucvi}', '供应商邮箱')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSupplierEmail'}
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
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3i2oersdair2j07z9e}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={2} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2og6qiafbgkik6l}', '供应商简称')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdSupplierSimpleName'}
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
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3i2og6tk4zxjwwtwo}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={8} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsSupplierInfo.form.!{l3i2oqozugw47dh4jo}', '开通管理员账号')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdAdminAccount'}
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
                    placeholder={fmtMsg(':cmsSupplierInfo.form.!{l3i2oqp2xi64jnrg0qq}', '建议填写邮箱@前的字符')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={9} rowSpan={1} columnSpan={2}>
              <XformFieldset>
                <Form.Item
                  name={'cmsSupplierLinkman'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsSupplierLinkman.current
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
                    $$ref={detailForms.current.cmsSupplierLinkman}
                    $$tableType="detail"
                    $$tableName="cmsSupplierLinkman"
                    title={fmtMsg(':cmsSupplierInfo.form.!{l3i2pzdxvcyz4dcze6i}', '联系人')}
                    defaultRowNumber={1}
                    mobileRender={['simple']}
                    pcSetting={['pagination']}
                    showNumber={true}
                    layout={'vertical'}
                    code={'fdLinkeman'}
                    columns={[
                      {
                        type: XformInput,
                        controlProps: {
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wkfe54mpnx1cjze}', '姓名'),
                          maxLength: 100,
                          name: 'fdName',
                          placeholder: fmtMsg(':cmsSupplierInfo.form.!{l3i2wkfgrfd7imfeso}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          type: XformInput,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wkfe54mpnx1cjze}', '姓名'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2wkfe54mpnx1cjze}', '姓名'),
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
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wmbcplplicv72xn}', '岗位职责'),
                          maxLength: 100,
                          name: 'fdPostResponsibility',
                          placeholder: fmtMsg(':cmsSupplierInfo.form.!{l3i2wmbfvq1k29cyec}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          type: XformInput,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wmbcplplicv72xn}', '岗位职责'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2wmbcplplicv72xn}', '岗位职责'),
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
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wthioode9hcoa8f}', '邮箱'),
                          maxLength: 100,
                          name: 'fdEmail',
                          placeholder: fmtMsg(':cmsSupplierInfo.form.!{l3i2wthlpsshma2vl1}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          type: XformInput,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wthioode9hcoa8f}', '邮箱'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2wthioode9hcoa8f}', '邮箱'),
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
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wvprj00q7f9lnhm}', '手机号'),
                          maxLength: 100,
                          name: 'fdMobile',
                          placeholder: fmtMsg(':cmsSupplierInfo.form.!{l3i2wvpurup5wssj97f}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          type: XformInput,
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsSupplierInfo.form.!{l3i2wvprj00q7f9lnhm}', '手机号'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsSupplierInfo.form.!{l3i2wvprj00q7f9lnhm}', '手机号'),
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
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
