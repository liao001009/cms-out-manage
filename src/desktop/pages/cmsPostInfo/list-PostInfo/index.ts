import api from '@/api/cmsPostInfo'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: ':cmsPostInfo.list.PostInfo',
  // 路由
  router: '/listPostInfo',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => api['listPostInfo'](query),
    // 内容渲染组件
    render: Content
  }
}
