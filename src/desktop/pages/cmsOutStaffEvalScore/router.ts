import ListLevelInfoCmpt from './list'
import ViewCmpt from './view'
import EditCmpt from './edit'
export default {
  /** 路由前缀 */
  router: '/cmsOutStaffEvalScore',
  /** 页面配置，第一个为首页 */
  pages: [ListLevelInfoCmpt, ViewCmpt, EditCmpt]
}
