//import ListOrderCmpt from './list'
import UploadAI from './uploadAI'
import interviewAI from './interviewAI'

export default {
  /** 路由前缀 */
  router: '/cmsInterviewWorkbench',
  /** 页面配置，第一个为首页 */
  pages: [UploadAI, interviewAI]
}
