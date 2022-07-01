import ListFrameInfoCmpt from './list-FrameInfo'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'


export default {
  /** 路由前缀 */
  router: '/CmsFrameInfo',
  /** 页面配置，第一个为首页 */
  pages: [ListFrameInfoCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
