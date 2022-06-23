import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutOrderTemplate } from '@/types/cmsOutOrderTemplate'

const commonApi = Api.get<ICmsOutOrderTemplate>('order/cmsOutOrderTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/order/cmsOutOrderTemplate/publish', http)
}

export default api
