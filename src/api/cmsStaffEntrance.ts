import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffEntrance } from '@/types/cmsStaffEntrance'

const commonApi = Api.get<ICmsStaffEntrance>('staff/cmsStaffEntrance', http)

const api = {
  ...commonApi,
  save: Api.build('staff/cmsStaffEntrance/save', http),
  // 入场申请(列表请求)
  listEntrance: Api.build('staff/cmsStaffEntrance/listEntrance', http),
}

export default api
