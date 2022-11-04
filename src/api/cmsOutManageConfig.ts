import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsContractInfo } from '@/types/cmsContractInfo'

const commonApi = Api.get<ICmsContractInfo>('cmsOutManageConfig', http)

const api = {
  ...commonApi,
  getRoleConfig: Api.build('cmsOutManageConfig/getRoleConfig', http),
  updateRole: Api.build('cmsOutManageConfig/updateRole', http),
  getOrderConfig: Api.build('cmsOutManageConfig/getOrderConfig', http),
  updateOrder: Api.build('cmsOutManageConfig/updateOrder', http),
  getProConfigData: Api.build('cmsOutManageConfig/getCommonConfigData', http),
  updateProConfigData: Api.build('cmsOutManageConfig/updateCommonConfigData', http)
}

export default api
