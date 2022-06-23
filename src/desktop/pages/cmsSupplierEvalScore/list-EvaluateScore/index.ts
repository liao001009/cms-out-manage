import api from '@/api/cmsSupplierEvalScore'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-manage:cmsSupplierEvalScore.list.EvaluateScore',
  // 路由
  router: '/listEvaluateScore',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => api['listEvaluateScore'](query),
    // 内容渲染组件
    render: Content
  }
}
