import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffAdjust } from '@/types/cmsStaffAdjust'

const commonApi = Api.get<ICmsStaffAdjust>('staff/cmsStaffAdjust', http)

const api = {
  ...commonApi,
  save: Api.build('staff/cmsStaffAdjust/save', http),
  // 人员调整(列表请求)
  listAdjust: Api.build('staff/cmsStaffAdjust/listAdjust', http)
}

export default api
