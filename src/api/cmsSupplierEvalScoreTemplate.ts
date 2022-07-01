import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvalScoreTemplate } from '@/types/cmsSupplierEvalScoreTemplate'

const commonApi = Api.get<ICmsSupplierEvalScoreTemplate>('cmsSupplierEvalScoreTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsSupplierEvalScoreTemplate/publish', http)
}

export default api
