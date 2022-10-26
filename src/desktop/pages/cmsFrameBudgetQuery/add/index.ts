import Content from './content'

export default {
  // 类型：模块
  type: 'page',
  // 页面标题
  title: '新建',
  // 路由
  router: '/add',
  keepalive: false,
  // 模块内容区
  children: {
    // 内容类型: 列表
    type: 'content-list',
    // 内容渲染组件
    render: Content,
    props: {
      mode: 'add'
    }
  }
}