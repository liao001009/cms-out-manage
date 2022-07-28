import ListAdjustCmpt from './list'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'
export default {
  /** 路由前缀 */
  router: '/cmsQuitRegister',
  /** 页面配置，第一个为首页 */
  pages: [ListAdjustCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
