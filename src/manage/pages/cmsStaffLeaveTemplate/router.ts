import ListCmpt from './list'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsStaffLeaveTemplate',
  /** 页面配置，第一个为首页 */
  pages: [ListCmpt, EditCmpt]
}
