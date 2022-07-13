import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutConfig } from '@/types/cmsOutConfig'

const commonApi = Api.get<ICmsOutConfig>('cmsOutConfig', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutConfig/save', http),
  // 权限配置(列表请求)
  listConfig: Api.build('cmsOutConfig/listConfig', http)
}

export default api
