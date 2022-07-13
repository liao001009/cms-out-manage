import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffAttConfig } from '@/types/cmsStaffAttConfig'

const commonApi = Api.get<ICmsStaffAttConfig>('cmsStaffAttConfig', http)

const api = {
  ...commonApi,
  save: Api.build('cmsStaffAttConfig/save', http),
  // 附件配置(列表请求)
  listConfig: Api.build('cmsStaffAttConfig/listConfig', http)
}

export default api
