import { createElement as h } from 'react'
import api from '@/api/cmsStaffLeave'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '编辑页面',
  // 路由
  router: '/edit/:id',
  // 页面是否全屏，默认false
  fullscreen: true,
  keepalive: false,
  // 临时解决方案，等runtime完善fullscreen逻辑后移除
  render: (props) => h('div', {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'auto',
      'zIndex': 99,
      backgroundColor: '#f0f2f5'
    }
  }, props.children),
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-view',
    // 内容渲染组件
    render: Content,
    // 请求
    dataUrl: ({ param }) =>
      api.edit({
        fdId: param.id,
        mechanisms: { load: '*' }
      })
  }
}