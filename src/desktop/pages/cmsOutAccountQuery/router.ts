import ListAccountCmpt from './list'
import ViewCmpt from './view'

export default {
  /** 路由前缀 */
  router: '/cmsOutAccountQuery',
  /** 页面配置，第一个为首页 */
  pages: [ListAccountCmpt, ViewCmpt]
}
