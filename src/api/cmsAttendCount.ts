import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsAttendCount } from '@/types/cmsAttendCount'

const commonApi = Api.get<ICmsAttendCount>('cmsAttendCount', http)

const api = {
  ...commonApi,
  save: Api.build('cmsAttendCount/save', http),
  // 工时费用统计列表(列表请求)
  listAttendCount: Api.build('cmsAttendCount/listAttendCount', http)
}

export default api
