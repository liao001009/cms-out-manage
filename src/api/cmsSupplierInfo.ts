import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSupplierInfo } from '@/types/cmsSupplierInfo'

const commonApi = Api.get<ICmsSupplierInfo>('supplier/cmsSupplierInfo', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsSupplierInfo/save', http),
  // 供应商信息(列表请求)
  listSupplierInfo: Api.build('supplier/cmsSupplierInfo/listSupplierInfo', http)
}

export default api
