import ListOrderCmpt from './list-Order'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'
import PrintCmpt from './print'

export default {
  /** 路由前缀 */
  router: '/cmsOutOrder',
  /** 页面配置，第一个为首页 */
  pages: [ListOrderCmpt, AddCmpt, ViewCmpt, EditCmpt, PrintCmpt]
}
