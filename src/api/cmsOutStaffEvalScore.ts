import { Api } from '@ekp-infra/common'
import http from '@/utils/http'

const commonApi = Api.get('cmsOutStaffEvalScore', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutStaffEvalScore/save', http),
  // 外包人员评价考核打分列表(列表请求)
  listOutStaffEvalScore: Api.build('cmsOutStaffEvalScore/listOutStaffEvalScore', http)
}

export default api
