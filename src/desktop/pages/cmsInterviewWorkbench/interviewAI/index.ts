// import api from '@/api/cmsProjectDemand'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '面试工作台',
  // 路由
  router: '/interviewAI',
  //全屏
  fullscreen: true,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    // dataUrl: ({ query }) => {
    //   const { sorts } = query
    //   return api['listDemand']({ ...query, sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' } })
    // },
    // 内容渲染组件
    render: Content
  }
}
