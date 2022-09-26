import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsValidAttDay } from '@/types/cmsValidAttDay'

const commonApi = Api.get<ICmsValidAttDay>('cmsValidAttDay', http)

const api = {
  ...commonApi,
  save: Api.build('cmsValidAttDay/save', http),
  // 月度有效出勤天数列表(列表请求)
  listValidAttDay: Api.build('cmsValidAttDay/listValidAttDay', http)
}

export default api
