import React, { useRef, useCallback } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Breadcrumb, Button, Message, Modal } from '@lui/core'
import XForm from './form'
import api from '@/api/cmsFrameInfo'
import './index.scss'
import { Auth } from '@ekp-infra/common'
//@ts-ignore
import Status, { EStatusType } from '@elements/status'
const { confirm } = Modal

const Content: React.FC<IContentViewProps> = props => {
  const { data, history, match } = props
  const params = match?.params

  // 机制组件引用
  const formComponentRef = useRef<any>()

  // 关闭
  const handleClose = useCallback(() => {
    history.goBack()
  }, [])

  const handleEdit = useCallback(() => {
    history.goto(`/cmsFrameInfo/edit/${data.fdId}`)
  }, [history])

  const handleDel = useCallback(() => {
    confirm({
      content: '确认删除此记录1？',
      onOk () {
        api.delete({ fdId: data.fdId })
          .then(res => {
            console.log('删除结果', res)
            if (res.success) {
              Message.success('删除成功')
              history.goBack()
            } else {
              Message.error('删除失败')
            }
          }, error => {
            Message.error(error?.response?.data?.msg)
          })
          .catch(error => {
            Message.error(error?.response?.data?.msg)
          })
      }
    })
  }, [])

  return (
    <Auth.Auth
      authURL='/basedata/cmsFrameInfo/get'
      authModuleName='cms-out-manage'
      params={{ vo: { fdId: params['id'] } }}
      unauthorizedPage={
        <Status type={EStatusType._403} title='抱歉，您暂无权限访问当前页面' />
      }
    >
      <div className='lui-approve-template'>
        {/* 操作区 */}
        <div className='lui-approve-template-header'>
          <Breadcrumb>
            <Breadcrumb.Item>基本信息管理</Breadcrumb.Item>
            <Breadcrumb.Item>框架信息</Breadcrumb.Item>
            <Breadcrumb.Item>查看</Breadcrumb.Item>
          </Breadcrumb>
          <div className='buttons'>
            <Button type='primary' onClick={handleEdit}>编辑</Button>
            <Button type='default' onClick={handleDel}>删除</Button>
            <Button type='default' onClick={handleClose}>关闭</Button>
          </div>
        </div>
        {/* 内容区 */}
        <div className='lui-approve-template-content'>
          {/* 表单信息 */}
          <div className='form'>
            <XForm formRef={formComponentRef} value={data || {}} />
          </div>
        </div>
      </div>
    </Auth.Auth>

  )
}

export default Content