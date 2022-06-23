import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutConfigTemplate } from '@/types/cmsOutConfigTemplate'

const commonApi = Api.get<ICmsOutConfigTemplate>('order/cmsOutConfigTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/order/cmsOutConfigTemplate/publish', http)
}

export default api
