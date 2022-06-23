import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutStaffInfo } from '@/types/cmsOutStaffInfo'

const commonApi = Api.get<ICmsOutStaffInfo>('supplier/cmsOutStaffInfo', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsOutStaffInfo/save', http),
  // 外包人员信息(列表请求)
  listStaffInfo: Api.build('supplier/cmsOutStaffInfo/listStaffInfo', http),
  // 供应商内嵌列表(列表请求)
  listInnerStaffInfo: Api.build('supplier/cmsOutStaffInfo/listInnerStaffInfo', http)
}

export default api
