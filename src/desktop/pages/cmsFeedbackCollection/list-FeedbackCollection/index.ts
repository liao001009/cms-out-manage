import api from '@/api/cmsFeedbackCollection'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-information:cmsFeedbackCollection.list.FeedbackCollection',
  // 路由
  router: '/listFeedbackCollection',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => api['listFeedbackCollection'](query),
    // 内容渲染组件
    render: Content
  }
}
