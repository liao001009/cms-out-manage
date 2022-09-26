import api from '@/api/cmsOverWork'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-staff:cmsOverWork.list.OverWork',
  // 路由
  router: '/listOverWork',
  keepalive: false,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => {
      const { sorts } = query
      // columns: ['fdId', 'fdName', 'fdCode', 'fdCreator', 'fdCreateTime'],
      return api['listOverWork']({
        ...query,
        sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' },
      })
    },
    // 内容渲染组件
    render: Content
  }
}
