import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsContractInfo } from '@/types/cmsContractInfo'

const commonApi = Api.get<ICmsContractInfo>('supplier/cmsContractInfo', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsContractInfo/save', http),
  // 合同信息(列表请求)
  listContractInfo: Api.build('supplier/cmsContractInfo/listContractInfo', http),
  // 供应商内嵌列表(列表请求)
  listInnerContractInfo: Api.build('supplier/cmsContractInfo/listInnerContractInfo', http)
}

export default api
