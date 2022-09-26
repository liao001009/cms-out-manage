import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFailNotice } from '@/types/cmsFailNotice'

const commonApi = Api.get<ICmsFailNotice>('cmsFailNotice', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFailNotice/save', http),
  // 落选通知(列表请求)
  listFail: Api.build('cmsFailNotice/listFail', http)
}

export default api
