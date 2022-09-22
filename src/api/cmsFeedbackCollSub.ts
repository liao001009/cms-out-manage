import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFeedbackCollSub } from '@/types/cmsFeedbackCollSub'

const commonApi = Api.get<ICmsFeedbackCollSub>('cmsFeedbackCollSub', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFeedbackCollSub/save', http),
  // 反馈收集类子流程列表(列表请求)
  listFeedbackCollSub: Api.build('cmsFeedbackCollSub/listFeedbackCollSub', http)
}

export default api
