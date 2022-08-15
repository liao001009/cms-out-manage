import api from '@/api/cmsSelectConfirm'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '列表',
  // 路由
  router: '/listSelect',
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 数据请求
    dataUrl: ({ query }) => {
      const { sorts } = query
      return api['listSelect']({ 
        ...query, 
        sorts: { ...sorts, fdCreateTime: sorts?.fdCreateTime ? sorts.fdCreateTime : 'desc' },
        // columns:  ['fdSubject', 'fdYear','fdQuarter' ,'fdProcessStatus','fdCreator', 'fdCreateTime']
      })
    },
    // 内容渲染组件
    render: Content
  }
}
