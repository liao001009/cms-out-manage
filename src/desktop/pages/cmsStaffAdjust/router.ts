import ListAdjustCmpt from './list-Adjust'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'
import PrintCmpt from './print'

export default {
  /** 路由前缀 */
  router: '/cmsStaffAdjust',
  /** 页面配置，第一个为首页 */
  pages: [ListAdjustCmpt, AddCmpt, ViewCmpt, EditCmpt, PrintCmpt]
}
