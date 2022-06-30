import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierPostPriceTemplate } from '@/types/cmsSupplierPostPriceTemplate'

const commonApi = Api.get<ICmsSupplierPostPriceTemplate>('cmsSupplierPostPriceTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsSupplierPostPriceTemplate/publish', http)
}

export default api
