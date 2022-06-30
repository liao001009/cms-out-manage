import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsFrameBudget } from '@/types/cmsFrameBudget'

const commonApi = Api.get<ICmsFrameBudget>('cmsFrameBudget', http)

const api = {
  ...commonApi,
  save: Api.build('cmsFrameBudget/save', http),
  // 框架预算(列表请求)
  listFrameBudget: Api.build('cmsFrameBudget/listFrameBudget', http),
  // 校验时间
  checkUnique: Api.build('cmsFrameBudget/checkUnique', http)

}

export default api
