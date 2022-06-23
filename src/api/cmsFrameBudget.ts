import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudget } from '@/types/cmsFrameBudget'

const commonApi = Api.get<ICmsFrameBudget>('basedata/cmsFrameBudget', http)

const api = {
  ...commonApi,
  save: Api.build('basedata/cmsFrameBudget/save', http),
  // 框架预算(列表请求)
  listFrameBudget: Api.build('basedata/cmsFrameBudget/listFrameBudget', http),
  // 校验时间
  checkUnique: Api.build('basedata/cmsFrameBudget/checkUnique', http)

}

export default api
