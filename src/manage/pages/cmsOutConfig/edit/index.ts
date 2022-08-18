// import apiOutManageConfig from '@/api/cmsOutManageConfig'
import Content from './content'
import {fmtMsg} from '@ekp-infra/respect'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '编辑页面',
  // 路由
  router: '/edit',
  // 面包屑
  renderBreadcrumb: [
    {
      label: fmtMsg(':menu.systemMenu','系统配置'),
      path: '/cmsOutConfig/edit',
    }
  ],
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-form',
    // 内容渲染组件
    render: Content,
    // // 请求
    // dataUrl: ({ query }) => {
    //   return apiOutManageConfig.getRoleConfig({...query})
    // },
  }
}
