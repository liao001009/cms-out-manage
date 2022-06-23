import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierInfoTemplate } from '@/types/cmsSupplierInfoTemplate'

const commonApi = Api.get<ICmsSupplierInfoTemplate>('supplier/cmsSupplierInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/supplier/cmsSupplierInfoTemplate/publish', http)
}

export default api
