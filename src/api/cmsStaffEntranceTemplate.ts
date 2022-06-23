import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffEntranceTemplate } from '@/types/cmsStaffEntranceTemplate'

const commonApi = Api.get<ICmsStaffEntranceTemplate>('staff/cmsStaffEntranceTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/staff/cmsStaffEntranceTemplate/publish', http)
}

export default api
