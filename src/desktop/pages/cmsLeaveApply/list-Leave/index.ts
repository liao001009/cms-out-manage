import api from '@/api/cmsLeaveApply'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-staff:cmsLeaveApply.list.Leave',
  // 路由
  router: '/listLeave',
  keepalive: false,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => {
      const { sorts } = query
      // columns: ['fdId', 'fdName', 'fdCode', 'fdCreator', 'fdCreateTime'],
      return api['listLeave']({
        ...query,
        sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' },
      })
    },
    // 内容渲染组件
    render: Content
  }
}
