import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvaluate } from '@/types/cmsSupplierEvaluate'

const commonApi = Api.get<ICmsSupplierEvaluate>('supplier/cmsSupplierEvaluate', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsSupplierEvaluate/save', http),
  // 供应商评价(列表请求)
  listSupplierEvaluate: Api.build('supplier/cmsSupplierEvaluate/listSupplierEvaluate', http)
}

export default api
