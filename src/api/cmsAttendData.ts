import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsAttendData } from '@/types/cmsAttendData'

const commonApi = Api.get<ICmsAttendData>('cmsAttendData', http)

const api = {
  ...commonApi,
  save: Api.build('cmsAttendData/save', http),
  // 考勤数据列表(列表请求)
  listAttend: Api.build('cmsAttendData/listAttend', http),
  // 查询人员数据
  listOutStaff: Api.build('cmsAttendData/listOutStaff', http)
}

export default api
