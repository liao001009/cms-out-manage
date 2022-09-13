import ListAttendCmpt from './list-Attend'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsAttendData',
  /** 页面配置，第一个为首页 */
  pages: [ListAttendCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
