import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvaluateTemplate } from '@/types/cmsSupplierEvaluateTemplate'

const commonApi = Api.get<ICmsSupplierEvaluateTemplate>('cmsSupplierEvaluateTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsSupplierEvaluateTemplate/publish', http)
}

export default api
