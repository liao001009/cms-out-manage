import api from '@/api/cmsOutOrderMain'
import Content from '@/desktop/pages/cmOrderCloundHost/list/content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: ':menu.cmsOrderNetworkAuth',
  // 路由
  router: '/listOrder',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => api['listOrder']({ ...query, conditions: { fdOrderType: '7' } }),
    // 内容渲染组件
    render: Content
  }
}
