import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierEvaluate } from '@/types/cmsSupplierEvaluate'

const commonApi = Api.get<ICmsSupplierEvaluate>('cmsSupplierEvaluate', http)

const api = {
  ...commonApi,
  save: Api.build('cmsSupplierEvaluate/save', http),
  // 供应商评价(列表请求)
  listSupplierEvaluate: Api.build('cmsSupplierEvaluate/listSupplierEvaluate', http)
}

export default api
