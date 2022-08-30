import ListOrderCmpt from './list-Order'
import ViewCmpt from './view'

export default {
  /** 路由前缀 */
  router: '/cmsOrderNetworkAuth',
  /** 页面配置，第一个为首页 */
  pages: [ListOrderCmpt, ViewCmpt]
}
