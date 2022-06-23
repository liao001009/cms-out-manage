import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffReviewUpgrade } from '@/types/cmsStaffReviewUpgrade'

const commonApi = Api.get<ICmsStaffReviewUpgrade>('supplier/cmsStaffReviewUpgrade', http)

const api = {
  ...commonApi,
  save: Api.build('supplier/cmsStaffReviewUpgrade/save', http),
  // 外包人员评审(列表请求)
  listStaffReview: Api.build('supplier/cmsStaffReviewUpgrade/listStaffReview', http)
}

export default api
