import { createElement as h } from 'react'
import api from '@/api/cmsAttendCount'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '新建',
  // 路由
  router: '/add',
  // 页面是否全屏，默认false
  fullscreen: true,
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
      backgroundColor: '#fff'
    }
  }, props.children),
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 内容渲染组件
    render: Content,
    props: {
      // 编辑模式：新建
      mode: 'add'
    },
    // 请求
    dataUrl: () =>
      api.init({
        mechanisms: { load: '*' }
      }),

  }
}