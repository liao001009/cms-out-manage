import React, { useRef, createRef, useState } from 'react'
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
import XformDetailTable from '@/desktop/components/XformDetailTable'
import XformTextarea from '@/desktop/components/XformTextarea'
import CMSXformModal, { EShowStatus } from '@/desktop/components/staff-cms/XformModal'
import api from '@/api/cmsProjectInfo'
import apiStaffInfo from '@/api/cmsOutStaffInfo'
import { outStaffInfoColumns, projectColumns } from '@/desktop/pages/common/common'
const MECHANISMNAMES = {}
const baseCls = 'staffLeave-form'


const XForm = (props) => {
  const detailForms = useRef({
    cmsStaffLeaveDetail: createRef() as any
  })
  const { formRef: formRef, value: value } = props
  const [fdCurrProject,setFdCurrProject] = useState<any>({})
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

  // 当前项目选择返回数据
  const handleProjectChange = (v) => {
    setFdCurrProject(v)
    form.setFieldsValue({
      fdBelongDept: v.fdBelongDept,
      fdBelongTeam: v.fdBelongTeam,
      fdProjectNature: v.fdProjectNature,
      fdProjectPrincipal: v.fdProjectPrincipal,
      fdInnerPrincipal: v.fdInnerPrincipal
    })
  }
  return (
    <div className={baseCls}>
      <div className="lui-xform">
        <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
          <XformAppearance>
            <LayoutGrid columns={2} rows={16}>
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
                      defaultTextValue={fmtMsg(':cmsStaffLeave.form.!{l47tccxkxgt8l4u79b}', '离场申请')}
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
                  title={fmtMsg(':cmsStaffLeave.form.!{l47tdsgnsqlan2qugs}', '主题')}
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
                      placeholder={fmtMsg(':cmsStaffLeave.form.!{l47tdsgrggkbannq8wq}', '请输入')}
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
                  title={fmtMsg(':cmsStaffLeave.form.!{l47tew2ifoxlw7bkh0n}', '联系电话')}
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
                      placeholder={fmtMsg(':cmsStaffLeave.form.!{l47tew2lx3mngvk63i}', '请输入')}
                      defaultValueFormulaVO={{
                        type: 'Eval',
                        script: '${func.sysorg.getOrgAttributeVal}(${data.biz.fd_creator}, 8,\'fdMobileNo\')',
                        vo: {
                          mode: 'formula',
                          content: '#查找组织属性#($离场申请（含外包人员评价）.创建人[内置]$, 8,\'fdMobileNo\')'
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
                  title={fmtMsg(':cmsStaffLeave.fdCreateTime', '创建时间')}
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
              <GridItem column={1} row={5} columnSpan={1} rowSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffLeave.form.!{l47tsmjxv026iy3m5pq}', '所属系统/项目')}
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
                      modalTitle='所属项目选择'
                      onChange={(v) => handleProjectChange(v)}
                      criteriaProps={['fdCode', 'fdFrame.fdName']}
                      criteriaKey='projectCriertia'
                    />
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={5} columnSpan={1} rowSpan={1}>
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
                    <XformSelect
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
                      showStatus="readOnly"
                    ></XformSelect>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={7} columnSpan={1} rowSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffLeave.form.!{l485c6iq7eqo22vs64v}', '项目负责人')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdProjectPrincipal'}
                    rules={[
                      {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
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
                      fdSysNumber={{}}
                      label={fmtMsg(':cmsStaffLeave.form.!{l485c6iq7eqo22vs64v}', '项目负责人')}
                      showStatus="readOnly"
                    ></XformAddress>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={7} columnSpan={1} rowSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffLeave.form.!{l485c9auoq6hz0d4tvq}', '内部负责人')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdInnerPrincipal'}
                    rules={[
                      {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
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
                      fdSysNumber={{}}
                      label={fmtMsg(':cmsStaffLeave.form.!{l485c9auoq6hz0d4tvq}', '内部负责人')}
                      showStatus="readOnly"
                    ></XformAddress>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={7}
                style={{
                  display: 'none'
                }}
                rowSpan={1}
                columnSpan={1}
              ></GridItem>
              <GridItem column={1} row={12} rowSpan={1} columnSpan={1}>
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
                      controlTip={fmtMsg(':cmsStaffLeave.form.!{l47vfj0h5w1jnx4h7bm}', '')}
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={12} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
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
              <GridItem column={1} row={6} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffLeave.form.!{l47tv9c980rr18iqk8u}', '所属部门')}
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
              <GridItem column={1} row={11} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={11} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={10} rowSpan={1} columnSpan={1}>
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
                    <XformRadio
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={14} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={14} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={15} rowSpan={1} columnSpan={2}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={15}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
              ></GridItem>
              <GridItem
                column={2}
                row={15}
                rowSpan={1}
                style={{
                  display: 'none'
                }}
                columnSpan={1}
              ></GridItem>
              <GridItem column={1} row={16} rowSpan={1} columnSpan={2}>
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
                      },
                      {
                        required: true,
                        message: fmtMsg(':required', '内容不能为空')
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsStaffLeave.form.!{l482w3gzhs16kg22ni6}', '请输入')}
                      showStatus="edit"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={16}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
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
              <GridItem
                column={2}
                row={14}
                rowSpan={1}
                style={{
                  display: 'none'
                }}
                columnSpan={1}
              ></GridItem>
              <GridItem column={2} row={10} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={13} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={13} rowSpan={1} columnSpan={1}>
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
                      showStatus="edit"
                    ></XformRadio>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={13}
                rowSpan={1}
                style={{
                  display: 'none'
                }}
                columnSpan={1}
              ></GridItem>
              <GridItem column={2} row={6} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsStaffLeave.form.!{l47tvd32luja2sqot3t}', '所属组/团队')}
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
              <GridItem column={1} row={8} columnSpan={2} rowSpan={1}>
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
                    <XformDetailTable
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
                          type: CMSXformModal,
                          controlProps: {
                            apiKey: apiStaffInfo,
                            apiName: 'listStaffInfo',
                            chooseFdName: 'fdName',
                            criteriaKey: 'presonCriertia',
                            criteriaProps: ['fdPost.fdName', 'fdProject.fdName'],
                            defaultTableCriteria:{
                              'fdStatusInfo':{
                                'searchKey':'$in',
                                'searchValue':['3','4']
                              },
                              'fdProject.fdName':{
                                'searchKey':'$contains',
                                'searchValue':Object.keys(fdCurrProject).length ? fdCurrProject.fdName : undefined
                              }
                            },
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ucie6axg62p00qnq}', '外包人员姓名'),
                            name: 'fdStaffName',
                            columnsProps: outStaffInfoColumns,
                            renderMode: 'singlelist',
                            direction: 'column',
                            rowCount: 3,
                            modelName: 'com.landray.sys.xform.core.entity.design.SysXFormDesign',
                            isForwardView: 'no',
                            desktop: {
                              type: CMSXformModal
                            },
                            onChangeProps: (v, r) => {
                              console.log('v', v)
                              sysProps.$$form.current.updateFormItemProps('cmsStaffLeaveDetail', {
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
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ucie6axg62p00qnq}', '外包人员姓名'),
                            desktop: {
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
                          type: XformInput,
                          controlProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                            maxLength: 100,
                            name: 'fdNamePinyin',
                            placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufatfw9bq6eb3ll}', '请输入'),
                            desktop: {
                              type: XformInput
                            },
                            type: XformInput,
                            showStatus: 'readOnly'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
                            desktop: {
                              layout: 'vertical'
                            }
                          },
                          label: fmtMsg(':cmsStaffLeave.form.!{l47ufatcqumgt0z87bj}', '姓名拼音'),
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
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                            maxLength: 100,
                            name: 'fdMobile',
                            placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufnh0dgokdxysj36}', '请输入'),
                            desktop: {
                              type: XformInput
                            },
                            type: XformInput,
                            showStatus: 'readOnly'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
                            desktop: {
                              layout: 'vertical'
                            }
                          },
                          label: fmtMsg(':cmsStaffLeave.form.!{l47ufngwxwcd6pkfn1}', '手机号'),
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
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                            maxLength: 100,
                            name: 'fdEmail',
                            placeholder: fmtMsg(':cmsStaffLeave.form.!{l47ufjyyxv7t9gzeju}', '请输入'),
                            desktop: {
                              type: XformInput
                            },
                            type: XformInput,
                            showStatus: 'readOnly'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
                            desktop: {
                              layout: 'vertical'
                            }
                          },
                          label: fmtMsg(':cmsStaffLeave.form.!{l47ufjytb8fbpuu478}', '邮箱'),
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
                            title: fmtMsg(':cmsStaffLeave.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                            maxLength: 100,
                            name: 'fdSystemAccount',
                            placeholder: fmtMsg(':cmsStaffLeave.form.!{l47uk9k0ylj9507ayb}', '请输入'),
                            desktop: {
                              type: XformInput
                            },
                            type: XformInput,
                            showStatus: 'edit'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l47uk9jyj0hq8h5cex}', '各类系统默认账号'),
                            desktop: {
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
                          type: XformSelect,
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
                            desktop: {
                              type: XformSelect
                            },
                            type: XformSelect,
                            showStatus: 'edit'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l4c4kldeq93hjsg361d}', '离场原因'),
                            desktop: {
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
                          type: XformRadio,
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
                            desktop: {
                              type: XformRadio
                            },
                            type: XformRadio,
                            showStatus: 'edit'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l4c57z05apvjrkx66v5}', '项目负责人评价：是否推荐'),
                            desktop: {
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
                          type: XformTextarea,
                          controlProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l4c4l0i9wr8qoee1tr}', '项目负责人评价：评语'),
                            maxLength: 2000,
                            name: 'fdProjectPrincipalEval',
                            placeholder: fmtMsg(':cmsStaffLeave.form.!{l4c4l0idb5sq9ddym3r}', '请输入'),
                            height: 3,
                            desktop: {
                              type: XformTextarea
                            },
                            type: XformTextarea,
                            showStatus: 'edit'
                          },
                          labelProps: {
                            title: fmtMsg(':cmsStaffLeave.form.!{l4c4l0i9wr8qoee1tr}', '项目负责人评价：评语'),
                            desktop: {
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
                      canImport={false}
                      showStatus="edit"
                    ></XformDetailTable>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={8}
                style={{
                  display: 'none'
                }}
                rowSpan={1}
                columnSpan={1}
              ></GridItem>
              <GridItem column={1} row={9} columnSpan={2} rowSpan={1}>
                <XformFieldset compose={true}>
                  <Form.Item name={'fdCol1j39ya'}>
                    <XformDescription
                      {...sysProps}
                      defaultTextValue={fmtMsg(':cmsStaffLeave.form.!{l47v9sxmgj8dir4egol}', '资源、账号、权限注销')}
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
                row={9}
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
    </div>
  )
}

export default XForm
