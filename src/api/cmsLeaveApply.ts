import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsLeaveApply } from '@/types/cmsLeaveApply'

const commonApi = Api.get<ICmsLeaveApply>('cmsLeaveApply', http)

const api = {
  ...commonApi,
  save: Api.build('cmsLeaveApply/save', http),
  // 调休/请假申请列表(列表请求)
  listLeave: Api.build('cmsLeaveApply/listLeave', http)
}

export default api
