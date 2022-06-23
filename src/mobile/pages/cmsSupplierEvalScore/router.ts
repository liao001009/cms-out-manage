import ListEvaluateScoreCmpt from './list-EvaluateScore'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsSupplierEvalScore',
  /** 页面配置，第一个为首页 */
  pages: [ListEvaluateScoreCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
