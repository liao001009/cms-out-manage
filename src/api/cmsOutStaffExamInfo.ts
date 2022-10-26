import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutStaffExamInfo } from '@/types/cmsOutStaffExamInfo'

const commonApi = Api.get<ICmsOutStaffExamInfo>('cmsOutStaffExamInfo', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutStaffExamInfo/save', http),
  // 外包人员考核信息查询列表(列表请求)
  listOutStaffExamInfo: Api.build('cmsOutStaffExamInfo/listOutStaffExamInfo', http)
}

export default api
