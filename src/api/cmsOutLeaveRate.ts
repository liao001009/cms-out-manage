import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutLeaveRate } from '@/types/cmsOutLeaveRate'

const commonApi = Api.get<ICmsOutLeaveRate>('cmsOutLeaveRate', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutLeaveRate/save', http),
  // 驻场人员离职率/淘汰率列表(列表请求)
  listOutLeaveRate: Api.build('cmsOutLeaveRate/listOutLeaveRate', http)
}

export default api
