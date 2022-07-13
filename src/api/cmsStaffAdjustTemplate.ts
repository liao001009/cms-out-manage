import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffAdjustTemplate } from '@/types/cmsStaffAdjustTemplate'

const commonApi = Api.get<ICmsStaffAdjustTemplate>('cmsStaffAdjustTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsStaffAdjustTemplate/publish', http)
}

export default api
