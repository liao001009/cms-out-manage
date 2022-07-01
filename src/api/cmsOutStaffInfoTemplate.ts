import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutStaffInfoTemplate } from '@/types/cmsOutStaffInfoTemplate'

const commonApi = Api.get<ICmsOutStaffInfoTemplate>('cmsOutStaffInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsOutStaffInfoTemplate/publish', http)
}

export default api
