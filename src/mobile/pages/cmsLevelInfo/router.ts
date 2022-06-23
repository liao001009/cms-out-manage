import ListLevelInfoCmpt from './list-LevelInfo'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsLevelInfo',
  /** 页面配置，第一个为首页 */
  pages: [ListLevelInfoCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
