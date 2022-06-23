import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsLevelInfoTemplate } from '@/types/cmsLevelInfoTemplate'

const commonApi = Api.get<ICmsLevelInfoTemplate>('basedata/cmsLevelInfoTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/baseData/cmsLevelInfoTemplate/publish', http)
}

export default api
