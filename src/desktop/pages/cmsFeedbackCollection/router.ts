import ListFeedbackCollectionCmpt from './list-FeedbackCollection'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsFeedbackCollection',
  /** 页面配置，第一个为首页 */
  pages: [ListFeedbackCollectionCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
