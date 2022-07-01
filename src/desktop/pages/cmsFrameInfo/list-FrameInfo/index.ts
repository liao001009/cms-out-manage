import api from '@/api/CmsFrameInfo'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-manage:CmsFrameInfo.list.FrameInfo',
  // 路由
  router: '/listFrameInfo',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => {
      const { sorts } = query
      return api['listFrameInfo']({ ...query, sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' } })
    },
    // 内容渲染组件
    render: Content
  }
}
