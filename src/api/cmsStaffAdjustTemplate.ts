import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffAdjustTemplate } from '@/types/cmsStaffAdjustTemplate'

const commonApi = Api.get<ICmsStaffAdjustTemplate>('staff/cmsStaffAdjustTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/staff/cmsStaffAdjustTemplate/publish', http)
}

export default api
