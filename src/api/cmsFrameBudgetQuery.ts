import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudgetQuery } from '@/types/cmsFrameBudgetQuery'

const commonApi = Api.get<ICmsFrameBudgetQuery>('cmsFrameBudgetQuery', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFrameBudgetQuery/save', http),
  // 框架预算额度查询列表(列表请求)
  listFrameBudgetQuery: Api.build('cmsFrameBudgetQuery/listFrameBudgetQuery', http)
}

export default api
