import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form, Select } from '@lui/core'
import { useApi, useSystem } from '@/desktop/supplier-shared/formHooks'
import XformAppearance from '@/desktop/components/supplier/XformAppearance'
import LayoutGrid from '@/desktop/components/supplier/LayoutGrid'
import GridItem from '@/desktop/components/supplier/GridItem'
import XformDescription from '@/desktop/components/supplier/XformDescription'
import XformFieldset from '@/desktop/components/supplier/XformFieldset'
import XformInput from '@/desktop/components/supplier/XformInput'
// import XformRelation from '@/desktop/components/form/XformRelation'
import XformDatetime from '@/desktop/components/supplier/XformDatetime'
import XformMoney from '@/desktop/components/supplier/XformMoney'
import XformRadio from '@/desktop/components/supplier/XformRadio'
import XformAddress from '@/desktop/components/supplier/XformAddress'
// import XformAttach from '@/desktop/components/form/XformAttach'
import { Module } from '@ekp-infra/common'
import api from '@/api/cmsFrameInfo'

const { Option } = Select
const Upload = Module.getComponent('sys-attach', 'Upload')

const MECHANISMNAMES = {
  fdAtt: 'attachmentDict'
}

const XForm = (props) => {
  const detailForms = useRef({})
  const { formRef: formRef, value: value } = props
  const [form] = Form.useForm()
  const [frameArray, setFrameArray] = useState<any>([])

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
                    showStatus="edit"
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
                    },
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformInput
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3gwgyfousrbns41tdb}', '请输入')}
                    showStatus="edit"
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
                <Form.Item
                  name={'fdSupplierName'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
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
            <GridItem column={1} row={3} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3mdydlnb2158rye74g}', '所属框架')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdFrame'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <Select
                    placeholder="请选择"
                    allowClear
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
            <GridItem column={1} row={5} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsContractInfo.form.!{l3gwhhu749t46p6gfxo}', '合同开始日期')}
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
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3gwhhuaz7qbu6iom1r}', '请输入')}
                    dataPattern={'yyyy-MM-dd'}
                    showStatus="edit"
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
                    showStatus="edit"
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
                <Form.Item
                  name={'fdTotalAmount'}
                  rules={[
                    {
                      required: true,
                      message: fmtMsg(':required', '内容不能为空')
                    }
                  ]}
                >
                  <XformMoney
                    {...sysProps}
                    placeholder={fmtMsg(':cmsContractInfo.form.!{l3hatji0tjcr3fnp0p}', '请输入')}
                    precision={4}
                    showStatus="edit"
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
                    showStatus="edit"
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
                    showStatus="edit"
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
                    showStatus="edit"
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
                    showStatus="edit"
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
                  {/* <XformAttach {...sysProps} singleMaxSize={102400000} showStatus="edit"></XformAttach> */}
                  <Upload
                    mode='file'
                    maxCount={1}
                    fdEntityName=''
                    multiple={false}
                    fdEntityKey='attachments'
                    operation={{ edit: false, preview: false, download: false }}
                  />
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
