import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutProjectEval } from '@/types/cmsOutProjectEval'

const commonApi = Api.get<ICmsOutProjectEval>('cmsOutStaffEval', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutStaffEval/save', http),
  // 外包人员评价列表(列表请求)
  listOutStaffEval: Api.build('cmsOutStaffEval/listOutStaffEval', http)
}

export default api
