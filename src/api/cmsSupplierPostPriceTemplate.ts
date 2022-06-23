import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierPostPriceTemplate } from '@/types/cmsSupplierPostPriceTemplate'

const commonApi = Api.get<ICmsSupplierPostPriceTemplate>('supplier/cmsSupplierPostPriceTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/supplier/cmsSupplierPostPriceTemplate/publish', http)
}

export default api
