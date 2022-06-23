import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsContractInfoTemplate } from '@/types/cmsContractInfoTemplate'

const commonApi = Api.get<ICmsContractInfoTemplate>('supplier/cmsContractInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/supplier/cmsContractInfoTemplate/publish', http)
}

export default api
