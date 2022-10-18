import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutSupplierEntrance } from '@/types/cmsOutSupplierEntrance'

const commonApi = Api.get<ICmsOutSupplierEntrance>('cmsOutSupplierEntrance', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutSupplierEntrance/save', http),
  // 列表视图(列表请求)
  listMain: Api.build('cmsOutSupplierEntrance/listMain', http)
}

export default api
