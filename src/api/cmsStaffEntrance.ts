import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffEntrance } from '@/types/cmsStaffEntrance'

const commonApi = Api.get<ICmsStaffEntrance>('cmsStaffEntrance', http)

const api = {
  ...commonApi,
  save: Api.build('cmsStaffEntrance/save', http),
  // 入场申请(列表请求)
  listEntrance: Api.build('cmsStaffEntrance/listEntrance', http),
  loadNodeExtend: Api.build('cmsStaffEntrance/loadNodeExtendPropertiesOnProcess', http),
}

export default api
