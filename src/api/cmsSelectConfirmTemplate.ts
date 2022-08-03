import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsSelectConfirmTemplate } from '@/types/cmsSelectConfirmTemplate'

const commonApi = Api.get<ICmsSelectConfirmTemplate>('cmsSelectConfirmTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsSelectConfirmTemplate/publish', http)
}

export default api
