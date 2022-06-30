import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutOrder } from '@/types/cmsOutOrder'

const commonApi = Api.get<ICmsOutOrder>('cmsOutOrder', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutOrder/save', http),
  // 工单管理(列表请求)
  listOrder: Api.build('cmsOutOrder/listOrder', http),
  //处理待办
  updateRemoveTodo: Api.build('cmsOutOrder/updateRemoveTodo', http)
}

export default api
