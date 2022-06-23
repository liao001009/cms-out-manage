import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudgetTemplate } from '@/types/cmsFrameBudgetTemplate'

const commonApi = Api.get<ICmsFrameBudgetTemplate>('basedata/cmsFrameBudgetTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('basedata/cmsFrameBudgetTemplate/publish', http)
}

export default api
