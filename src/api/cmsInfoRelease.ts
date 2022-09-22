import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsInfoRelease } from '@/types/cmsInfoRelease'

const commonApi = Api.get<ICmsInfoRelease>('cmsInfoRelease', http)

const api = {
  ...commonApi,
  save: Api.build('cmsInfoRelease/save', http),
  // 信息发布类列表(列表请求)
  listInfoRelease: Api.build('cmsInfoRelease/listInfoRelease', http)
}

export default api
