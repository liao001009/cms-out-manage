import api from '@/api/cmsOutOrderMain'
import Content from '@/desktop/pages/cmOrderCloundHost/list/content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: 'cms-out-manage:menu.cmsOrderEntranceGuard',
  // 路由
  router: '/listOrder',
  keepalive: false,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => {
      const { sorts } = query
      return api['listOrder']({ ...query, sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' }, conditions: { ...query.conditions, fdOrderType: '6' } })
    },
    // 内容渲染组件
    render: Content
  }
}
