import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffEntranceTemplate } from '@/types/cmsStaffEntranceTemplate'

const commonApi = Api.get<ICmsStaffEntranceTemplate>('cmsStaffEntranceTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsStaffEntranceTemplate/publish', http)
}

export default api
