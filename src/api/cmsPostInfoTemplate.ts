import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsPostInfoTemplate } from '@/types/cmsPostInfoTemplate'

const commonApi = Api.get<ICmsPostInfoTemplate>('basedata/cmsPostInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/baseData/cmsPostInfoTemplate/publish', http)
}

export default api