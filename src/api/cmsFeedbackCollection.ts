import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFeedbackCollection } from '@/types/cmsFeedbackCollection'

const commonApi = Api.get<ICmsFeedbackCollection>('cmsFeedbackCollection', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFeedbackCollection/save', http),
  // 反馈收集类列表(列表请求)
  listFeedbackCollection: Api.build('cmsFeedbackCollection/listFeedbackCollection', http)
}

export default api
