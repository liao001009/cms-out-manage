import { Api } from '@ekp-infra/common'
import http from '@/utils/http'
import { ICmsStaffReviewUpgradeTemplate } from '@/types/cmsStaffReviewUpgradeTemplate'

const commonApi = Api.get<ICmsStaffReviewUpgradeTemplate>('supplier/cmsStaffReviewUpgradeTemplate', http)

const api = {
  ...commonApi,
  // 模板发布
  publish: Api.build('/supplier/cmsStaffReviewUpgradeTemplate/publish', http)
}

export default api