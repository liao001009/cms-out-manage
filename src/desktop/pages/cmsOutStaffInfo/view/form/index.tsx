import React, { useRef } from 'react'
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
import XformImage from '@/desktop/components/XformImage'
import XformRadio from '@/desktop/components/XformRadio'
import XformDatetime from '@/desktop/components/XformDatetime'
import XformSelect from '@/desktop/components/XformSelect'
import { Module } from '@ekp-infra/common'

const Upload = Module.getComponent('sys-attach', 'Upload')

export enum EShowStatus {
  /** 查看 */
  'view' = 'view',
  /** 编辑 */
  'edit' = 'edit',
  /** 添加 */
  'add' = 'add'
}
const MECHANISMNAMES = {
  fdPhoto: 'attachmentDict',
  fdResumeAtt: 'attachmentDict',
  fdSchoolingAtt: 'attachmentDict'
}
const baseCls = 'outStaffInfo-form'

const XForm = (props) => {
  const detailForms = useRef({})
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
    <div className={baseCls}>
      <div className="lui-xform">
        <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
          <XformAppearance>
            <LayoutGrid columns={2} rows={21}>
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
                  <Form.Item name={'fdCol2cmn0f'}>
                    <XformDescription
                      {...sysProps}
                      defaultTextValue={fmtMsg(':cmsOutStaffInfo.form.!{l3itxz3pqakhb2vx9r}', '外包人员信息')}
                      controlValueStyle={{
                        fontWeight: 'bold',
                        fontSize: 20
                      }}
                      showStatus="view"
                    ></XformDescription>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={2} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3itzy1crvjqnpzbnt8}', '姓名')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdName'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3itzy1gfrzqcit0dtl}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={2} rowSpan={6} columnSpan={1}>
                <XformFieldset
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3itzc38htt05cm1ltm}', '个人照片')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdPhoto'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <XformImage {...sysProps} maxCount={1} singleMaxSize={20480000} showStatus="view"></XformImage>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={3} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lbnn2zuf7qg81itg}', '姓名拼音')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdNamePinyin'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lbnn33xk8y2texnm}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={3}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
              ></GridItem>
              <GridItem column={1} row={4} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3iu027izyoihkz5ze9}', '身份证号')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdCardNo'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3iu027lnwn4jq6xve}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={5} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lbm56har7emj2pss}', '性别')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdSex'}
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
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lbm56pw6rmvlbkwg}', '男'),
                          value: 'M'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lbm56yji7hy6ld8f}', '女'),
                          value: 'F'
                        }
                      ]}
                      rowCount={3}
                      direction={'column'}
                      serialType={'empty'}
                      optionSource={'custom'}
                      showStatus="view"
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
              <GridItem
                column={2}
                row={4}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
              ></GridItem>
              <GridItem column={1} row={9} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3mpotu09e4th32vklr}', '组织信息/所属供应商')}
                  layout={'horizontal'}
                >
                  <Form.Item name={'fdSupplier'}>
                    <span>{value.fdSupplier && value.fdSupplier.fdName}</span>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={9} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lb3n6libr50hydes}', '岗位')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item name={'fdPost'}>
                    <span>{value.fdPost.fdName}</span>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={6} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3iu0b3khy6a43lnpkn}', '出生日期')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item name={'fdBirthDate'}>
                    <XformDatetime
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3iu0b3nrlmp1tkiqia}', '请输入')}
                      dataPattern={'yyyy-MM-dd'}
                      showStatus="view"
                    ></XformDatetime>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={6}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
              ></GridItem>
              <GridItem column={1} row={7} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3iu06zv4njsha5uee5}', '手机号')}
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
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3iu06zyamxii97y79f}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem
                column={2}
                row={7}
                rowSpan={1}
                columnSpan={1}
                style={{
                  display: 'none'
                }}
              ></GridItem>
              <GridItem column={1} row={8} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3ld95gh5x188j0qqo9}', '邮箱')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdEmail'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3ld95gkaijjuvfn1r}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={8} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3ld971ubpyylqag4j9}', '工作地')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdWorkAddress'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3ld971zgn9zm7bkq9p}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={10} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lazgahjztp6y71d7}', '自评技能级别')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdSkillLevel'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lazgbfi57oychqbg}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={10} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3mpxl7e8qek5ooy28o}', '定级级别')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdConfirmLevel'}
                    rules={[
                      {
                        validator: lengthValidator(50)
                      }
                    ]}
                  >
                    <XformSelect
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3mpxl7izzanc6s2rh}', '请输入')}
                      options={[
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3mpyi0tfoxsncsy0ks}', '资深'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3mpyi0ucliz64p00kq}', '高级'),
                          value: '2'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3mpyi0u3j08op5wzfz}', '中级'),
                          value: '3'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3mpyi0us0ndoe5a7z7}', '初级'),
                          value: '4'
                        }
                      ]}
                      optionSource={'custom'}
                      showStatus="view"
                    ></XformSelect>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              
              <GridItem column={1} row={11} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lb0kaezssxcpa6l9}', '技能')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdSkill'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lb0kalnrolo26qai}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={11} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3sb66ib59bbaunf3i5}', '参加工作日期')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item name={'fdEntryWorkDate'}>
                    <XformDatetime
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3sb66ifqthkl78l9zr}', '请输入')}
                      dataPattern={'yyyy-MM-dd'}
                      showStatus="view"
                    ></XformDatetime>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={12} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lb0nknmtcpq84iap8}', '简历附件')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdResumeAtt'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <Upload
                      mode='file'
                      fdEntityName='com.landray.cms.out.manage.core.entity.supplier.CmsOutStaffInfo'
                      fdEntityKey='fdResumeAtt'
                      uploadMode={'list'}
                      operation={{
                        edit: false,
                        change: false,
                        download: true,
                        print: false,
                      }}
                    />
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={13} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lb6ebsedf8dqx3mc}', '最高学历')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdHighestEducation'}
                    rules={[
                      {
                        validator: lengthValidator(50)
                      }
                    ]}
                  >
                    <XformSelect
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lb6eccp4syfrn9daq}', '请输入')}
                      options={[
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lb8gpoaz0xj1znu5e}', '高中'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lb8gpqsa1dkyunv4g}', '专科'),
                          value: '2'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lb8gptifemq19c12}', '本科'),
                          value: '3'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lb8gpvwi2j25x1zbt}', '研究生'),
                          value: '4'
                        }
                      ]}
                      optionSource={'custom'}
                      showStatus="view"
                    ></XformSelect>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={14} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lb9g9b7ew87yb5ytp}', '专业')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdMajor'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lb9g9rr2ptz9l6axr}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={15} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lba61aig5uztqgiob}', '学历证明附件')}
                  layout={'horizontal'}
                  required={true}
                >
                  <Form.Item
                    name={'fdSchoolingAtt'}
                    rules={[
                      {
                        validator: lengthValidator(200)
                      }
                    ]}
                  >
                    <Upload
                      mode='file'
                      fdEntityName='com.landray.cms.out.manage.core.entity.supplier.CmsOutStaffInfo'
                      fdEntityKey='fdSchoolingAtt'
                      uploadMode={'list'}
                      operation={{
                        edit: false,
                        change: false,
                        download: true,
                        print: false,
                      }}
                    />
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={16} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l47vinx108tvhhkd91lf}', '最高学历所在学校')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdHighestSchool'}
                  >
                    <XformInput
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l47vinx6ev5crmzfeb6}', '请输入')}
                      showStatus="view"
                    ></XformInput>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={17} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l47virvmjz8pvkyfmo}', '毕业日期')}
                  layout={'horizontal'}
                >
                  <Form.Item name={'fdGraduateDate'}>
                    <XformDatetime
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l47virvs6dxj7wzki3q}', '请输入')}
                      dataPattern={'yyyy-MM-dd'}
                      showStatus="view"
                    ></XformDatetime>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={18} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lc9l7am9lx5gkwgj}', '状态信息')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdStatusInfo'}
                    rules={[
                      {
                        validator: lengthValidator(50)
                      }
                    ]}
                  >
                    <XformSelect
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lc9l7feamjxxvz7da}', '请输入')}
                      options={[
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1qz79vs7ew9a}', '未参与项目'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1rldn1bxp8z8}', '中选待入场'),
                          value: '2'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1rcqvoswe9ogc}', '项目中-远程'),
                          value: '3'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1rmlg344zk2lp}', '项目中-驻场'),
                          value: '4'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1rg0ar3ng3i7q}', '已离场'),
                          value: '5'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lcaf1rmz1s31keypa}', '已离职'),
                          value: '6'
                        }
                      ]}
                      optionSource={'custom'}
                      showStatus="view"
                    ></XformSelect>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={19} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lcarixaeowio47r3n}', '当前项目')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdProject'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <span>{value.fdProject && value.fdProject.fdName}</span>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={19} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lck9saekqx64dnhqn}', '当前项目性质')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdCurrentProjectNature'}
                    rules={[
                      {
                        validator: lengthValidator(50)
                      }
                    ]}
                  >
                    <XformSelect
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3lck9se47688gycoqr}', '请输入')}
                      options={[
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lczdwvquws1ec70yr}', '项目外包'),
                          value: '1'
                        },
                        {
                          label: fmtMsg(':cmsOutStaffInfo.form.!{l3lczdwvyl7lvnhyv1}', '厂商驻场实施'),
                          value: '2'
                        }
                      ]}
                      optionSource={'custom'}
                      showStatus="view"
                    ></XformSelect>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={20} rowSpan={1} columnSpan={2}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3lczrijlhuq7nplue}', '当前所属招证内部团队')}
                  layout={'horizontal'}
                >
                  <Form.Item
                    name={'fdInnerTeam'}
                    rules={[
                      {
                        validator: lengthValidator(100)
                      }
                    ]}
                  >
                    <span>{value.fdInnerTeam && value.fdInnerTeam.fdName}</span>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={1} row={21} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3ld0l9hh2caymedodf}', '首次入场时间')}
                  layout={'horizontal'}
                >
                  <Form.Item name={'fdFirstEntranceDate'}>
                    <XformDatetime
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3ld0l9l51wc9fnxwu9}', '请输入')}
                      dataPattern={'yyyy-MM-dd'}
                      showStatus="view"
                    ></XformDatetime>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
              <GridItem column={2} row={21} rowSpan={1} columnSpan={1}>
                <XformFieldset
                  labelTextAlign={'left'}
                  mobileContentAlign={'right'}
                  title={fmtMsg(':cmsOutStaffInfo.form.!{l3ld0mr2k796uaafvk}', '上次调级时间')}
                  layout={'horizontal'}
                >
                  <Form.Item name={'fdLastUpgradeDate'}>
                    <XformDatetime
                      {...sysProps}
                      placeholder={fmtMsg(':cmsOutStaffInfo.form.!{l3ld0mr4gjrbtofso2h}', '请输入')}
                      dataPattern={'yyyy-MM-dd'}
                      showStatus="view"
                    ></XformDatetime>
                  </Form.Item>
                </XformFieldset>
              </GridItem>
            </LayoutGrid>
          </XformAppearance>
        </Form>
      </div>
    </div>
  )
}

export default XForm
