import ListEntranceCmpt from './list-Entrance'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/cmsSupplierEntrance',
  /** 页面配置，第一个为首页 */
  pages: [ListEntranceCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
