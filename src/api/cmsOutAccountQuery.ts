import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutAccountQuery } from '@/types/cmsOutAccountQuery'

const commonApi = Api.get<ICmsOutAccountQuery>('cmsOutAccountQuery', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutAccountQuery/save', http),
  // 系统账号查询列表(列表请求)
  listAccount: Api.build('cmsOutAccountQuery/listAccount', http)
}

export default api
