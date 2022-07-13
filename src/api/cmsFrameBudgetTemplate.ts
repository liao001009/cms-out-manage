import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudgetTemplate } from '@/types/cmsFrameBudgetTemplate'

const commonApi = Api.get<ICmsFrameBudgetTemplate>('cmsFrameBudgetTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('cmsFrameBudgetTemplate/publish', http)
}

export default api
