// import api from '@/api/proConfig'
import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '修改配置',//'pro-config:menu.proConfig',
  // 路由
  router: '/edit',
  // 模块内容区
  children: {
    // 内容类型: 详情
    type: 'content-detail',
    // 数据请求
    // dataUrl: ({ query }) => api.get({ ...query }),
    // 内容渲染组件
    render: Content
  }
  // 权限控制
  // auth: {  authURL: '/demoMain/update'  }
}
