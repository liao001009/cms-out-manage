import ListInfoReleaseCmpt from './list-InfoRelease'
import AddCmpt from './add'
import ViewCmpt from './view'
import EditCmpt from './edit'

export default {
  /** 路由前缀 */
  router: '/cmsInfoRelease',
  /** 页面配置，第一个为首页 */
  pages: [ListInfoReleaseCmpt, AddCmpt, ViewCmpt, EditCmpt]
}
