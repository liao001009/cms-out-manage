import { IContentViewProps } from '@ekp-runtime/render-module'
import { Form, Message } from '@lui/core'
import React, { useEffect, useState } from 'react'
import ConfigForm from './form'
import apiProConfig from '@/api/cmsOutManageConfig'

const baseClass = 'pro-config'
const Content: React.FC<IContentViewProps> = (props) => {
  const [form] = Form.useForm()
  const [configData, setConfigData] = useState<any>([])
  const initProConfig = async () => {
    try {
      const res = await apiProConfig.getProConfigData({})
      setConfigData(res?.data || [])
    } catch (error) {
      console.warn(error)
      Message.error(error.response.data.msg)
    }
  }

  useEffect(() => {
    initProConfig()
  }, [])

  const handleSubmit = (v) => {
    form.validateFields().then((res) => {
      console.log('res', res)
      const resSub = configData.filter(item => { return item.tabKey === v })
      const resData = {}
      resSub[0]?.content.map(item => {
        resData[item.name] = form.getFieldValue(item.name)
      })
      const subData = {
        tabKey: v,
        data: resData
      }
      apiProConfig.updateProConfigData(subData).then(res => {
        if (res.success) {
          Message.success('保存成功！', 3)
        } else {
          Message.error('保存失败！', 3)
        }
      }).catch(() => {
        Message.error('保存失败！', 3)
      })
    })
  }

  return (
    <div className={`${baseClass}`}>
      <div className={`${baseClass}-form`}>
        <Form form={form} colon={true}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout='horizontal'
          scrollToFirstError
        >
          <ConfigForm {...props} configData={configData} handleSubmit={handleSubmit} />
        </Form>
      </div>
    </div>
  )
}
export default Content