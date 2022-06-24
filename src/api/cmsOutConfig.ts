import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutConfig } from '@/types/cmsOutConfig'

const commonApi = Api.get<ICmsOutConfig>('order/cmsOutConfig', http)

const api = {
  ...commonApi,
  save: Api.build('order/cmsOutConfig/save', http),
  // 权限配置(列表请求)
  listConfig: Api.build('order/cmsOutConfig/listConfig', http)
}

export default api
