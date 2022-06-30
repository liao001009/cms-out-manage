import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvalScore } from '@/types/cmsSupplierEvalScore'

const commonApi = Api.get<ICmsSupplierEvalScore>('cmsSupplierEvalScore', http)

const api = {
  ...commonApi,
  save: Api.build('cmsSupplierEvalScore/save', http),
  // 评价打分(列表请求)
  listEvaluateScore: Api.build('cmsSupplierEvalScore/listEvaluateScore', http)
}

export default api
