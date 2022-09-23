import ListStaffInfoCmpt from './list-ValidAttDay'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/cmsValidAttDay',
  /** 页面配置，第一个为首页 */
  pages: [ListStaffInfoCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
