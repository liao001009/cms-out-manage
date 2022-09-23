import ListFailCmpt from './list-Fail'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsFailNotice',
  /** 页面配置，第一个为首页 */
  pages: [ListFailCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
