import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFeedbackCollectionTemplate } from '@/types/cmsFeedbackCollectionTemplate'

const commonApi = Api.get<ICmsFeedbackCollectionTemplate>('cmsFeedbackCollectionTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsFeedbackCollectionTemplate/publish', http)
}

export default api
