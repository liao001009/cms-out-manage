import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutSupplierAmount } from '@/types/cmsOutSupplierAmount'

const commonApi = Api.get<ICmsOutSupplierAmount>('cmsOutSupplierAmount', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutSupplierAmount/save', http),
  // 供应商中标金额(列表请求)
  listAmount: Api.build('cmsOutSupplierAmount/listAmount', http)
}

export default api
