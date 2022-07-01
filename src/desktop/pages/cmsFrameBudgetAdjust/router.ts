import ListBudgetAdjustCmpt from './list-BudgetAdjust'
import ListInnerBudgetAdjustCmpt from './list-InnerBudgetAdjust'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/CmsFrameBudgetAdjust',
  /** 页面配置，第一个为首页 */
  pages: [ListBudgetAdjustCmpt, ListInnerBudgetAdjustCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
