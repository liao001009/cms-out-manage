import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutDeliveryCycle } from '@/types/cmsOutDeliveryCycle'

const commonApi = Api.get<ICmsOutDeliveryCycle>('cmsOutDeliveryCycle', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutDeliveryCycle/save', http),
  // 人员交付周期/时效列表(列表请求)
  listOutDeliveryCycle: Api.build('cmsOutDeliveryCycle/listOutDeliveryCycle', http)
}

export default api
