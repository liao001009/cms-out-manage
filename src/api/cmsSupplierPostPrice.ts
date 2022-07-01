import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierPostPrice } from '@/types/cmsSupplierPostPrice'

const commonApi = Api.get<ICmsSupplierPostPrice>('cmsSupplierPostPrice', http)

const api = {
  ...commonApi,
  save: Api.build('cmsSupplierPostPrice/save', http),
  // 供应商岗位价格(列表请求)
  listPostPrice: Api.build('cmsSupplierPostPrice/listPostPrice', http)
}

export default api
