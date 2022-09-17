import ListLevelInfoCmpt from './list'
import ViewCmpt from './view'
import AddCmpt from './add'
import EditCmpt from './edit'
export default {
  /** 路由前缀 */
  router: '/cmsOutOrder',
  /** 页面配置，第一个为首页 */
  pages: [ListLevelInfoCmpt, ViewCmpt, AddCmpt, EditCmpt]
}
