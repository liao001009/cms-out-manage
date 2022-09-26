import api from '@/api/cmsFailNotice'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-manage:menu.cmsFailNotice',
  // 路由
  router: '/listFail',
  keepalive: false,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    // dataUrl: ({ query }) => api['listFail'](query),
    dataUrl: ({ query }) => {
      const { sorts } = query
      return api['listFail']({ ...query, sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' } })
    },
    // 内容渲染组件
    render: Content
  }
}
