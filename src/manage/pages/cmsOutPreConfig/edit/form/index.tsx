import { Module } from '@ekp-infra/common'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Button, Form, Input, Select, Switch, Tabs } from '@lui/core'
import React from 'react'

const Address = Module.getComponent('sys-org', 'Address')
const TabPane = Tabs.TabPane
const baseCls = 'pro-config'

export interface IProps {
  configData: any
  handleSubmit?: (v) => void
}

const ConfigForm: React.FC<IProps & IContentViewProps> = (props) => {
  const { handleSubmit, configData } = props
  const renderTag = (item) => {
    switch (item.type) {
      case 'input':
        return <Input allowClear />
      case 'select':
        return <Select allowClear mode={'multiple'} options={item.options} />
      case 'address':
        return <Address multi={item?.notes === '1'} />
      case 'switch':
        return <Switch defaultChecked={item.value} />
      case 'password':
        return <Input allowClear type='password' />
      default:
        return null
    }
  }

  const handleClick = (v) => {
    handleSubmit?.(v)
  }

  const renderTabs = () => {
    const resultTag =
      <Tabs defaultActiveKey={'0'}>
        {
          configData && configData.map((item, index) => {
            const tabPane =
              <TabPane tab={item.tabName} key={index} tabKey={item.tabKey} >
                {<Form.Item key={item} initialValue={item.tabKey} name={item.tabKey} label={item.tabName} hidden={true}>
                  <Input allowClear />
                </Form.Item>}
                {
                  item?.content?.map((tag, itemIndex) => {
                    return (
                      <Form.Item key={itemIndex} label={tag.label}
                        initialValue={tag.value}
                        name={tag.name} rules={[{ required: tag.required, message: '不能为空!' },]}>
                        {
                          renderTag(tag)
                        }
                      </Form.Item>
                    )
                  })
                }
                <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
                  <Button type="primary" htmlType='submit' onClick={() => { handleClick(item.tabKey) }}>
                    提交
                  </Button>
                </Form.Item>
              </TabPane>
            return tabPane
          })
        }
      </Tabs>
    return resultTag
  }

  return (
    <div className={`${baseCls}`}>
      {renderTabs()}
    </div>
  )
}

export default ConfigForm