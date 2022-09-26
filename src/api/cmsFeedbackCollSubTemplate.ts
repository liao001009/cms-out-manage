import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFeedbackCollSubTemplate } from '@/types/cmsFeedbackCollSubTemplate'

const commonApi = Api.get<ICmsFeedbackCollSubTemplate>('cmsFeedbackCollSubTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsFeedbackCollSubTemplate/publish', http)
}

export default api
