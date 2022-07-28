import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsQuitRegister } from '@/types/cmsQuitRegister'

const commonApi = Api.get<ICmsQuitRegister>('cmsQuitRegister', http)

const api = {
  ...commonApi,
  save: Api.build('cmsQuitRegister/save', http),
  // 离职登记(列表请求)
  listQuit: Api.build('cmsQuitRegister/listQuit', http)
}

export default api
