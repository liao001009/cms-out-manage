import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsInfoReleaseTemplate } from '@/types/cmsInfoReleaseTemplate'

const commonApi = Api.get<ICmsInfoReleaseTemplate>('cmsInfoReleaseTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/cmsInfoReleaseTemplate/publish', http)
}

export default api
