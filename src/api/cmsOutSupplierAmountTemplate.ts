import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutSupplierAmountTemplate } from '@/types/cmsOutSupplierAmountTemplate'

const commonApi = Api.get<ICmsOutSupplierAmountTemplate>('cmsOutSupplierAmountTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsOutSupplierAmountTemplate/publish', http)
}

export default api
