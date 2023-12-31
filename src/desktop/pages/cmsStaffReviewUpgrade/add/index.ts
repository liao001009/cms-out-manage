import { createElement as h } from 'react'
import Content from './content'
import api from '@/api/cmsStaffReviewUpgrade'
export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '新建',
  // 路由
  router: '/add/:templateId',
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
    type: 'content-list',
    // 内容渲染组件
    render: Content,
    dataUrl: ({ param }) =>
      api.init({
        fdTemplate: { fdId: param.templateId },
        mechanisms: { load: '*' }
      })
  }
}