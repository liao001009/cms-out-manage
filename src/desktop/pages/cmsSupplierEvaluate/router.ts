import ListSupplierEvaluateCmpt from './list-SupplierEvaluate'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/cmsSupplierEvaluate',
  /** 页面配置，第一个为首页 */
  pages: [ListSupplierEvaluateCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
