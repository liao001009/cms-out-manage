import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffLeave } from '@/types/cmsStaffLeave'

const commonApi = Api.get<ICmsStaffLeave>('cmsStaffLeave', http)

const api = {
  ...commonApi,
  save: Api.build('cmsStaffLeave/save', http),
  // 离场申请(列表请求)
  listLeave: Api.build('cmsStaffLeave/listLeave', http)
}

export default api
