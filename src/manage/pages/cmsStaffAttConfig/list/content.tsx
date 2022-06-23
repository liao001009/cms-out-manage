import React, { FC, useEffect } from 'react'
import { Module } from '@ekp-infra/common'
import { Button, Form, Message } from '@lui/core'
import api from '@/api/cmsStaffAttConfig'
import './index.scss'
const Upload = Module.getComponent('sys-attach', 'Upload')
interface IProps {
  data: any
}
const baseCls = 'cms-staff-att-config'
const Content: FC<IProps> = (props: IProps) => {
  const { data } = props
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then(value => {
      const attachment = value.fdEntranceAtt.concat(value.fdAdjustAtt).filter(i => i)
      const params = {
        mechanisms: {
          attachment
        }
      }
      // @ts-ignore
      api.update({ ...params, fdId: data.fdId, }).then(res => {
        if (res.success) {
          Message.success('保存成功')
        } else {
          Message.error('保存失败')
        }
      }).catch(() => {
        Message.error('保存失败')
      })
    })
  }
  const init = () => {
    const { attachment } = data?.mechanisms || []
    const fdEntranceAtt = attachment.filter(i => i.fdEntityKey === 'fdEntranceAtt')
    const fdAdjustAtt = attachment.filter(i => i.fdEntityKey === 'fdAdjustAtt')
    form.setFieldsValue({
      fdEntranceAtt,
      fdAdjustAtt
    })
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <div className={`${baseCls}`}>
      <div className={`${baseCls}-head`}>
        <div className={`${baseCls}-head-text`}>附件模板配置</div>
        <Button label='保存' type='primary' onClick={handleSubmit}></Button>
      </div>
      <Form
        form={form}
        labelCol={{ span: 2, offset: 0 }}
      >
        <Form.Item
          label='入场申请附件模板'
          name={'fdEntranceAtt'}
        >
          <Upload
            mode='file'
            fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffAttConfig'
            multiple={false}
            fdEntityKey='fdEntranceAtt'
            operation={{ edit: true, preview: false, download: true, print: false }}
          />
        </Form.Item>
        <Form.Item
          label='人员调整附件模板'
          name={'fdAdjustAtt'}
        >
          <Upload
            mode='file'
            fdEntityName='com.landray.cms.out.manage.core.entity.staff.CmsStaffAttConfig'
            multiple={false}
            fdEntityKey='fdAdjustAtt'
            operation={{ edit: true, preview: false, download: true, print: false }}
          />
        </Form.Item>
        <Form.Item>
        </Form.Item>
      </Form>
    </div >
  )
}

export default Content