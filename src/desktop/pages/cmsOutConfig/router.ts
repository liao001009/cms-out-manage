import ListConfigCmpt from './list-Config'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'
import PrintCmpt from './print'

export default {
  /** 路由前缀 */
  router: '/cmsOutConfig',
  /** 页面配置，第一个为首页 */
  pages: [ListConfigCmpt, AddCmpt, ViewCmpt, EditCmpt, PrintCmpt]
}
