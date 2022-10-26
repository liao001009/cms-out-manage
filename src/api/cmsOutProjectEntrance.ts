import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutProjectEntrance } from '@/types/cmsOutProjectEntrance'

const commonApi = Api.get<ICmsOutProjectEntrance>('cmsOutProjectEntrance', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutProjectEntrance/save', http),
  // 列表视图(列表请求)
  listMain: Api.build('cmsOutProjectEntrance/listMain', http)
}

export default api
