import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutOrderMain } from '@/types/cmsOutOrderMain'

const commonApi = Api.get<ICmsOutOrderMain>('cmsOutOrderMain', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutOrderMain/save', http),
  // 工单列表(列表请求)
  listOrder: Api.build('cmsOutOrderMain/listOrder', http)
}

export default api
