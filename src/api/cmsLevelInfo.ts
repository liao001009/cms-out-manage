import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsLevelInfo } from '@/types/cmsLevelInfo'

const commonApi = Api.get<ICmsLevelInfo>('basedata/cmsLevelInfo', http)

const api = {
  ...commonApi,
  save: Api.build('basedata/cmsLevelInfo/save', http),
  // 级别信息(列表请求)
  listLevelInfo: Api.build('basedata/cmsLevelInfo/listLevelInfo', http)
}

export default api
