import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutStaffRecord } from '@/types/cmsOutStaffRecord'

const commonApi = Api.get<ICmsOutStaffRecord>('cmsOutStaffRecord', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutStaffRecord/save', http),
  // 项目人员查询列表(列表请求)
  listOutStaffRecord: Api.build('cmsOutStaffRecord/listOutStaffRecord', http)
}

export default api
