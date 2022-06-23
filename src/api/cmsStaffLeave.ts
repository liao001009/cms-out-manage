import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffLeave } from '@/types/cmsStaffLeave'

const commonApi = Api.get<ICmsStaffLeave>('staff/cmsStaffLeave', http)

const api = {
  ...commonApi,
  save: Api.build('staff/cmsStaffLeave/save', http),
  // 离场申请(列表请求)
  listLeave: Api.build('staff/cmsStaffLeave/listLeave', http)
}

export default api
