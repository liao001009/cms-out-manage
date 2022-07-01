import ListLeaveCmpt from './list-Leave'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/staff/cmsStaffLeave',
  /** 页面配置，第一个为首页 */
  pages: [ListLeaveCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
