import list from './list'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsFrameBudget',
  /** 页面配置，第一个为首页 */
  pages: [AddCmpt, list, ViewCmpt, EditCmpt]
}
