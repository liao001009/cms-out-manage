import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffLeaveTemplate } from '@/types/cmsStaffLeaveTemplate'

const commonApi = Api.get<ICmsStaffLeaveTemplate>('cmsStaffLeaveTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsStaffLeaveTemplate/publish', http)
}

export default api
