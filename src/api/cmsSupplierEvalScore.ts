import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvalScore } from '@/types/cmsSupplierEvalScore'

const commonApi = Api.get<ICmsSupplierEvalScore>('supplier/cmsSupplierEvalScore', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsSupplierEvalScore/save', http),
  // 评价打分(列表请求)
  listEvaluateScore: Api.build('supplier/cmsSupplierEvalScore/listEvaluateScore', http)
}

export default api
