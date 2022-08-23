import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOverWork } from '@/types/cmsOverWork'

const commonApi = Api.get<ICmsOverWork>('cmsOverWork', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOverWork/save', http),
  // 加班申请列表(列表请求)
  listOverWork: Api.build('cmsOverWork/listOverWork', http)
}

export default api
