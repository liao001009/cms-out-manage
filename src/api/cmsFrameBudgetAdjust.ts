import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudgetAdjust } from '@/types/cmsFrameBudgetAdjust'

const commonApi = Api.get<ICmsFrameBudgetAdjust>('cmsFrameBudgetAdjust', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFrameBudgetAdjust/save', http),
  // 框架预算调整(列表请求)
  listBudgetAdjust: Api.build('cmsFrameBudgetAdjust/listBudgetAdjust', http),
  // 框架预算内嵌列表(列表请求)
  listInnerBudgetAdjust: Api.build('cmsFrameBudgetAdjust/listInnerBudgetAdjust', http)
}

export default api
