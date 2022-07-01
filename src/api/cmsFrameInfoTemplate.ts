import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameInfoTemplate } from '@/types/cmsFrameInfoTemplate'

const commonApi = Api.get<ICmsFrameInfoTemplate>('cmsFrameInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/baseData/cmsFrameInfoTemplate/publish', http)
}

export default api
