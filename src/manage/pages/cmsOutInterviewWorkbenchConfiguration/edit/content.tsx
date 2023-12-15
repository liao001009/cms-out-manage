// src/components/Home.tsx
import React, { useEffect, useState } from 'react'
import './index.scss'
import { Form, Input, Button } from 'antd'
import axios from 'axios'

const initialState: any = {
  ocrExtractUrl: 'ocr转换接口基础路径',
  fileTypes: '文件类型列表', //值由接口提供方提供
  docTypeId: '文件类型', //值由接口提供方提供
  featureTypeId: '卡片id', //值由接口提供方提供
  userName: '获取token用户名',
  password: '获取token密码',
  keywordExtractUrl: '关键字提取地址',
  keywordExtractInterface: '关键字提取接口',
  appKey: '关键字提取appKey',
  appSecret: '关键字提取appSecret',
  source: '关键字提取参数', //一般是appid
  personMessageId: '个人信息场景id',
  personMessageSceneId: '个人信息场景scene_id',
  skillPointId: '技术栈场景id',
  skillPointSceneId: '技术栈场景scene_id',
  workExperienceId: '工作经历场景id',
  workExperienceSceneId: '工作经历场景scene_id'
}

const Config = () => {
  const [form] = Form.useForm()
  const [state, setState] = useState<any>(initialState)

  useEffect(() => {
    // 在组件初始化时调用获取配置的接口
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/data/cms-out-manage/cmsOutWorkbench/config/query')
        const configData = response?.data?.data?.data

        // 将获取的配置数据设置为表单的初始值
        form.setFieldsValue(configData)

        // 更新组件内部的 state
        setState(configData)
      } catch (error) {
        console.error('Error fetching configuration:', error)
      }
    }

    // 调用获取配置的函数
    fetchConfig()
  }, [form])

  const onHandleChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState: any) => ({
      ...prevState,
      [type]: e.target.value,
    }))
  }

  const onConfirm = async () => {
    console.log('Current State:', state)
    try {
      // Make the API request to save the configuration
      const response = await axios.post('/data/cms-out-manage/cmsOutWorkbench/config/save', state)
      console.log('API Response:', response.data)
    } catch (error) {
      console.error('Error saving configuration:', error)
    }
  }

  const onReset = () => {
    // Reset all values to initial state
    setState(initialState)
    // Reset form fields
    form.resetFields()
  }

  return (
    <div className='container'>
      <Form form={form} name="config">
        {Object.keys(initialState).map((key) => (
          <Form.Item
            key={key}
            name={key}
            label={(
              <div className={'form-item-label'}>{key}</div>
            )}
          >
            <Input
              placeholder={`请输入${key}`}
              value={state[key]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleChange(key, e)}
            />
          </Form.Item>
        ))}
      </Form>
      <div className='button-container'>
        <Button type="primary" style={{ marginRight: '24px' }} onClick={onConfirm}>确认</Button>
        <Button type="default" onClick={onReset}>置空</Button>
      </div>
    </div>
  )
}

export default Config
