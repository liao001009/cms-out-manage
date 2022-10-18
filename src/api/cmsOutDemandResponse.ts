import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutDemandResponse } from '@/types/cmsOutDemandResponse'

const commonApi = Api.get<ICmsOutDemandResponse>('cmsOutDemandResponse', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutDemandResponse/save', http),
  // 列表视图1(列表请求)
  listMain: Api.build('cmsOutDemandResponse/listMain', http)
}

export default api
