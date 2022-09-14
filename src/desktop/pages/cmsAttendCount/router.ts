import ListAttendCountCmpt from './list-AttendCount'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsAttendCount',
  /** 页面配置，第一个为首页 */
  pages: [ListAttendCountCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
