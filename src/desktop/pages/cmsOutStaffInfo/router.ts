import ListStaffInfoCmpt from './list-StaffInfo'
import ListInnerStaffInfoCmpt from './list-InnerStaffInfo'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'
import PrintCmpt from './print'

export default {
  /** 路由前缀 */
  router: '/cmsOutStaffInfo',
  /** 页面配置，第一个为首页 */
  pages: [ListStaffInfoCmpt, ListInnerStaffInfoCmpt, AddCmpt, ViewCmpt, EditCmpt, PrintCmpt]
}
