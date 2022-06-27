import React, { useRef, createRef, useState, Fragment, useEffect } from 'react'
import './index.scss'
import { fmtMsg } from '@ekp-infra/respect'
import { Form } from '@lui/core'
import { Module } from '@ekp-infra/common'
import { useApi, useSystem } from '@/desktop/shared/formHooks-staff'
import XformAppearance from '@/desktop/components/XformAppearance'
import LayoutGrid from '@/desktop/components/LayoutGrid'
import GridItem from '@/desktop/components/GridItem'
import XformDescription from '@/desktop/components/XformDescription'
import XformFieldset from '@/desktop/components/XformFieldset'
import XformInput from '@/desktop/components/XformInput'
import XformAddress from '@/desktop/components/XformAddress'
import XformRadio from '@/desktop/components/XformRadio'
import XformDatetime from '@/desktop/components/XformDatetime'
import XformCheckbox from '@/desktop/components/XformCheckbox'
import XformDetailTable from '@/desktop/components/XformDetailTable'
import CMSXformModal, { EShowStatus } from '@/desktop/components/staff-cms/XformModal'
import api from '@/api/cmsProjectInfo'
import apiStaffAttConfig from '@/api/cmsStaffAttConfig'
import apiStaffInfo from '@/api/cmsOutStaffInfo'
import { outStaffInfoColumns, projectColumns } from '@/desktop/common'
const Upload = Module.getComponent('sys-attach', 'Upload')

const MECHANISMNAMES = {
  fdAtt: 'attachmentDict',
  fdAttTemplate: 'attachmentDict'
}

const XForm = (props) => {
  const detailForms = useRef({
    cmsStaffAdjustDetail: createRef() as any
  })

  const { formRef: formRef, value: value } = props
  const [fdStationStaus, setFdStationStaus] = useState<string>(value.fdStation)
  const [fdAdjustReasonStaus, setFdAdjustReasonStatus] = useState<string>(value.fdAdjustReason)
  const [form] = Form.useForm()

  const init = () => {
    const { query } = props
    apiStaffAttConfig.get({ ...query, mechanisms: { load: '*' } }).then(res => {
      // @ts-ignore
      const { attachment } = res.data?.mechanisms || []
      const fdAttTemplate = attachment.filter(i => i.fdEntityKey === 'fdAdjustAtt')
      form.setFieldsValue({
        fdAttTemplate
      })
    })
  }
  useEffect(() => {
    init()
  }, [])
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

  // 当前项目选择返回数据
  const handleProjectChange = (v) => {
    form.setFieldsValue({
      fdProjectPrincipal: v.fdProjectPrincipal,
      fdInnerPrincipal: v.fdInnerPrincipal
    })
  }
  // 调整后项目选择返回数据
  const handleAdjustProjectChange = (v) => {
    form.setFieldsValue({
      fdAdjustProPrincipal: v.fdProjectPrincipal,
      fdAdjustInnerPrincipal: v.fdInnerPrincipal
    })
  }
  return (
    <div className="lui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance>
          <LayoutGrid columns={2} rows={22}>
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
                    defaultTextValue={fmtMsg(':cmsStaffAdjust.form.!{l47tccxkxgt8l4u79b}', '驻场人员调整')}
                    layout={'horizontal'}
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
                title={fmtMsg(':cmsStaffAdjust.form.!{l47tdsgnsqlan2qugs}', '主题')}
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
                    placeholder={fmtMsg(':cmsStaffAdjust.form.!{l47tdsgrggkbannq8wq}', '请输入')}
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
                title={fmtMsg(':cmsStaffAdjust.fdCreator', '创建者')}
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
            <GridItem column={1} row={5} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l4858bbwnyvzr3uofpc}', '调整意见')}
                layout={'horizontal'}
                required={true}
              >
                <Form.Item
                  name={'fdAdjustReason'}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4858bcafos6a0qeoin}', '更换项目'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4858bcx0t80bavs1csb}', '变更权限'),
                        value: '2'
                      }
                    ]}
                    onChange={(v) => { setFdAdjustReasonStatus(v) }}
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
              row={5}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem column={2} row={3} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.fdCreatorDept', '创建者部门')}
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
                title={fmtMsg(':cmsStaffAdjust.form.!{l47tew2ifoxlw7bkh0n}', '联系电话')}
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
                    placeholder={fmtMsg(':cmsStaffAdjust.form.!{l47tew2lx3mngvk63i}', '请输入')}
                    defaultValueFormulaVO={{
                      type: 'Eval',
                      script: '${func.sysorg.getOrgAttributeVal}(${data.biz.fd_creator}, 8,\'fdMobileNo\')',
                      vo: {
                        mode: 'formula',
                        content: '#查找组织属性#($驻场人员调整.创建人[内置]$, 8,\'fdMobileNo\')'
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
                title={fmtMsg(':cmsStaffAdjust.fdCreateTime', '创建时间')}
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
            <GridItem column={1} row={6} columnSpan={2} rowSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l47tsmjxv026iy3m5pq}', '当前项目')}
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
                    showStatus={EShowStatus.add}
                    criteriaProps={['fdCode', 'fdFrame.fdName']}
                    criteriaKey='projectCriertia'
                    modalTitle='所属项目选择'
                    onChange={(v) => handleProjectChange(v)}
                  />
                </Form.Item>
              </XformFieldset>
            </GridItem>
            {
              fdAdjustReasonStaus === '1' ? <GridItem column={1} row={8} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffAdjust.form.!{l485bc49yijf5fspqf}', '调整后项目')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdAdjustProject'}
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
                      showStatus={EShowStatus.add}
                      modalTitle='所属项目选择'
                      onChange={(v) => handleAdjustProjectChange(v)}
                      criteriaProps={['fdCode', 'fdFrame.fdName']}
                      criteriaKey='projectCriertia'
                    />
                  </Form.Item>
                </XformFieldset>
              </GridItem> : null
            }
            {
              fdAdjustReasonStaus === '1' ? <Fragment>
                <GridItem column={1} row={9} columnSpan={1} rowSpan={1}>
                  <XformFieldset
                    labelTextAlign={'left'}
                    mobileContentAlign={'right'}
                    title={fmtMsg(':cmsStaffAdjust.form.!{l485c6iq7eqo22vs64v}', '调整后项目负责人')}
                    layout={'horizontal'}
                  >
                    <Form.Item name={'fdAdjustProPrincipal'}>
                      <XformAddress
                        {...sysProps}
                        org={{
                          orgTypeArr: ['8'],
                          defaultValueType: 'null'
                        }}
                        range={'all'}
                        preSelectType={'fixed'}
                        fdSysNumber={{}}
                        label={fmtMsg(':cmsStaffAdjust.form.!{l485c6iq7eqo22vs64v}', '调整后项目负责人')}
                        showStatus="readOnly"
                      ></XformAddress>
                    </Form.Item>
                  </XformFieldset>
                </GridItem>
                <GridItem column={2} row={9} columnSpan={1} rowSpan={1}>
                  <XformFieldset
                    labelTextAlign={'left'}
                    mobileContentAlign={'right'}
                    title={fmtMsg(':cmsStaffAdjust.form.!{l485c9auoq6hz0d4tvq}', '调整后内部负责人')}
                    layout={'horizontal'}
                  >
                    <Form.Item name={'fdAdjustInnerPrincipal'}>
                      <XformAddress
                        {...sysProps}
                        org={{
                          orgTypeArr: ['8'],
                          defaultValueType: 'null'
                        }}
                        range={'all'}
                        preSelectType={'fixed'}
                        fdSysNumber={{}}
                        label={fmtMsg(':cmsStaffAdjust.form.!{l485c9auoq6hz0d4tvq}', '调整后内部负责人')}
                        showStatus="readOnly"
                      ></XformAddress>
                    </Form.Item>
                  </XformFieldset>
                </GridItem>
              </Fragment> : null
            }
            <GridItem
              column={2}
              row={9}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem
              column={2}
              row={8}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={2}
              row={6}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={17} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482sf4jla56zux83gm}', '网络权限调整')}
                layout={'horizontal'}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483auz7fdoryp397la}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483auz7dctbx7vyj5}', '不涉及'),
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
              row={17}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={2}
              row={17}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l47tv9c980rr18iqk8u}', '当前项目负责人')}
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
            <GridItem column={1} row={12} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l485jbczbrw391vxmnp}', '完成应用权限调整')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdAppPerm'}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l485jbd4vax228ix7h}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l485jbd9ue6d0orernd}', '不涉及'),
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
            <GridItem column={2} row={12} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l47vah7yn9f2xm4kg2r}', '云主机账号调整')}
                layout={'horizontal'}
                help={fmtMsg(':cmsStaffAdjust.form.!{l47vfj0h5w1jnx4h7bm}', '')}
              >
                <Form.Item
                  name={'fdCloudHost'}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47vah86nuc10jznin}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47vah8bhla1kfguv54}', '不涉及'),
                        value: '0'
                      }
                    ]}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    controlTip={fmtMsg(':cmsStaffAdjust.form.!{l47vfj0h5w1jnx4h7bm}', '')}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={12}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={14} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482nw3zmlt617j4tmi}', '是否需要物理机')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483bd07kapet31qv7}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483bd06kn8kkx4u8l}', '不涉及'),
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
            <GridItem column={2} row={14} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482peikh2dws298nmn}', '是否需要coding账号')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483b8reid8079pnngg}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483b8rd5w0ex4u1cnk}', '不涉及'),
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
            <GridItem column={1} row={13} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482nufstu97ks4u25}', '码云账号调整')}
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
                  <XformRadio
                    {...sysProps}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483bi2lhxnv686lma}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483bi2k8f7e2f87iqc}', '不涉及'),
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
            <GridItem column={1} row={16} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482sh1j6m8hzuxviel}', '工位处理调整')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdStation'}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4838nr85dnpaffekrv}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4838nr77ksqe0q7seb}', '不涉及'),
                        value: '0'
                      }
                    ]}
                    onChange={(e) => { setFdStationStaus(e) }}
                    rowCount={3}
                    direction={'column'}
                    serialType={'empty'}
                    optionSource={'custom'}
                    showStatus="edit"
                  ></XformRadio>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            {
              fdStationStaus === '1' ? <GridItem column={2} row={16} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffAdjust.form.!{l4dynw3s6nz6jg60429}', '工位地点')}
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
                          label: fmtMsg(':cmsStaffAdjust.form.!{l4dyo8irztd6c84jlr}', '深圳'),
                          value: 'sz'
                        },
                        {
                          label: fmtMsg(':cmsStaffAdjust.form.!{l4dyo8iry6lmc8tlbwo}', '武汉'),
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
              </GridItem> : null
            }
            <GridItem column={1} row={18} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482tzs47za4h2j5hxr}', '门禁处理调整')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l482tzsbzdit39nzk6j}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l482tzshvt438g3rkus}', '不涉及'),
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
            <GridItem column={2} row={18} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482v2yuetsjeqv3onq}', '门禁范围调整')}
                layout={'horizontal'}
                // required={true}
                className='entrance'
              >
                <Form.Item
                  name={'fdEntranceGuardScope'}
                // rules={[
                //   {
                //     validator: lengthValidator(200)
                //   },
                //   {
                //     // required: true,
                //     message: fmtMsg(':required', '内容不能为空')
                //   }
                // ]}
                >
                  <XformCheckbox
                    {...sysProps}
                    multi={true}
                    options={[
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa8jinbrrct4a}', '威新1楼'),
                        value: '01'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa8qghseott9y}', '威新4楼'),
                        value: '04'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa8ha24qodt5b}', '威新5楼'),
                        value: '05'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa9u7zdy4xzs5}', '威新6楼'),
                        value: '06'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa6c2lpifd84z6}', '武汉301'),
                        value: '301'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4dxrxa7obh519w7gvc}', '武汉302'),
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
                title={fmtMsg(':cmsStaffAdjust.form.!{l482w3gv0iehzw5tmva7}', '具体说明')}
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
                    placeholder={fmtMsg(':cmsStaffAdjust.form.!{l482w3gzhs16kg22ni6}', '请输入')}
                    showStatus="edit"
                  ></XformInput>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem
              column={2}
              row={19}
              rowSpan={1}
              columnSpan={1}
              style={{
                display: 'none'
              }}
            ></GridItem>
            <GridItem
              column={2}
              row={19}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={20} rowSpan={1} columnSpan={2}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdColLdxp2n'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsStaffAdjust.form.!{l482wwj1opgyw8jrtzh}', '供应商上传资料')}
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
                      ':cmsStaffAdjust.form.!{l482yeygbgd7o2bh3cm}',
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
              row={20}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={21} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l4830o1sjl5qofdcw48}', '模板下载')}
                layout={'horizontal'}
              >
                <Form.Item name={'fdAttTemplate'}>
                  <Upload
                    mode='file'
                    fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffAdjust'
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
              row={21}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={1} row={22} rowSpan={1} columnSpan={2}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482x9oheg8kfwghnzk}', '资料上传')}
                layout={'horizontal'}
              >
                <Form.Item
                  name={'fdAtt'}
                  rules={[
                    {
                      validator: lengthValidator(200)
                    },
                  ]}
                >
                  <Upload
                    mode='file'
                    fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffAdjust'
                    multiple={false}
                    fdEntityKey='fdAtt'
                    operation={{ edit: false, preview: false, download: false, print: false }}
                  />
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
            <GridItem
              column={2}
              row={16}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={2} row={13} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482nsax4701h2qqkpk}', '悟空账号调整')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483blgeq8rb0ssep7}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483blgdysjrk97nwfq}', '不涉及'),
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
            <GridItem column={1} row={15} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482nz2vtk08rczjmp}', '桌面助手调整')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483b4axnwvnwbvwmg}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l483b4aw62250ecg8bo}', '不涉及'),
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
            <GridItem column={2} row={15} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l482sd8f5o2ezowr4cd}', 'VPN账号调整')}
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
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4839pqyyvt0zfsym4}', '是'),
                        value: '1'
                      },
                      {
                        label: fmtMsg(':cmsStaffAdjust.form.!{l4839pqxxirscdum7en}', '不涉及'),
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
              row={15}
              rowSpan={1}
              style={{
                display: 'none'
              }}
              columnSpan={1}
            ></GridItem>
            <GridItem column={2} row={7} rowSpan={1} columnSpan={1}>
              <XformFieldset
                labelTextAlign={'left'}
                mobileContentAlign={'right'}
                title={fmtMsg(':cmsStaffAdjust.form.!{l47tvd32luja2sqot3t}', '当前内部负责人')}
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
                    showStatus="readOnly"
                  ></XformAddress>
                </Form.Item>
              </XformFieldset>
            </GridItem>
            <GridItem column={1} row={10} columnSpan={2} rowSpan={1}>
              <XformFieldset>
                <Form.Item
                  name={'cmsStaffAdjustDetail'}
                  noStyle
                  rules={[
                    {
                      validator: (rule, value, callback) => {
                        detailForms.current.cmsStaffAdjustDetail.current
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
                    $$ref={detailForms.current.cmsStaffAdjustDetail}
                    $$tableType="detail"
                    $$tableName="cmsStaffAdjustDetail"
                    title={fmtMsg(':cmsStaffAdjust.form.!{l47ubnidlwzsgmgcbxm}', '调整人员信息')}
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
                          columnsProps: outStaffInfoColumns,
                          criteriaKey: 'presonCriertia',
                          criteriaProps: ['fdPost.fdName', 'fdProject.fdName'],
                          modalTitle: '人员信息',
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
                            sysProps.$$form.current.updateFormItemProps('cmsStaffAdjustDetail', {
                              rowValue: {
                                rowNum: r,
                                value: {
                                  fdNamePinyin: v.fdNamePinyin,
                                  fdMobile: v.fdMobile,
                                  fdEmail: v.fdEmail,
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
                        options: {
                          validateRules: {
                            required: true,
                            message: fmtMsg(':required', '内容不能为空')
                          }
                        },
                        label: fmtMsg(':cmsStaffEntrance.form.!{l47ucie6axg62p00qnq}', '姓名')
                      },
                      {
                        type: XformInput,
                        controlProps: {
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                          maxLength: 100,
                          name: 'fdNamePinyin',
                          placeholder: fmtMsg(':cmsStaffAdjust.form.!{l47ufatfw9bq6eb3ll}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          showStatus: 'readOnly'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
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
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                          maxLength: 100,
                          name: 'fdMobile',
                          placeholder: fmtMsg(':cmsStaffAdjust.form.!{l47ufnh0dgokdxysj36}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          showStatus: 'readOnly'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
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
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                          maxLength: 100,
                          name: 'fdEmail',
                          placeholder: fmtMsg(':cmsStaffAdjust.form.!{l47ufjyyxv7t9gzeju}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          type: XformInput,
                          showStatus: 'readOnly'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47ufjytb8fbpuu478}', '邮箱'),
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
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                          maxLength: 100,
                          name: 'fdSystemAccount',
                          placeholder: fmtMsg(':cmsStaffAdjust.form.!{l47uk9k0ylj9507ayb}', '请输入'),
                          desktop: {
                            type: XformInput
                          },
                          showStatus: 'edit'
                        },
                        labelProps: {
                          title: fmtMsg(':cmsStaffAdjust.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                          desktop: {
                            layout: 'vertical'
                          }
                        },
                        label: fmtMsg(':cmsStaffAdjust.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
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
            <GridItem column={1} row={11} columnSpan={2} rowSpan={1}>
              <XformFieldset compose={true}>
                <Form.Item name={'fdCol1j39ya'}>
                  <XformDescription
                    {...sysProps}
                    defaultTextValue={fmtMsg(':cmsStaffAdjust.form.!{l47v9sxmgj8dir4egol}', '资源、账号、权限变更')}
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
              row={11}
              style={{
                display: 'none'
              }}
              rowSpan={1}
              columnSpan={1}
            ></GridItem>
          </LayoutGrid>
        </XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
