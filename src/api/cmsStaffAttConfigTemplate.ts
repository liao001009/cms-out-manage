import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffAttConfigTemplate } from '@/types/cmsStaffAttConfigTemplate'

const commonApi = Api.get<ICmsStaffAttConfigTemplate>('cmsStaffAttConfigTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsStaffAttConfigTemplate/publish', http)
}

export default api
