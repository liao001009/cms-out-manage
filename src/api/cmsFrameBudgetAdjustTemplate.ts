import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudgetAdjustTemplate } from '@/types/cmsFrameBudgetAdjustTemplate'

const commonApi = Api.get<ICmsFrameBudgetAdjustTemplate>('cmsFrameBudgetAdjustTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('cmsFrameBudgetAdjustTemplate/publish', http)
}

export default api
