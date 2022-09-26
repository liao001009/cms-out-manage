import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsOutProjectEval } from '@/types/cmsOutProjectEval'

const commonApi = Api.get<ICmsOutProjectEval>('cmsOutProjectEval', http)

const api = {
  ...commonApi,
  save: Api.build('cmsOutProjectEval/save', http),
  // 外包项目评价列表(列表请求)
  listOutProjectEval: Api.build('cmsOutProjectEval/listOutProjectEval', http),
  // 获取已挑选的供应商
  findSupplierByProjectId: Api.build('cmsOutProjectEval/findSupplierByProjectId', http)
}

export default api
