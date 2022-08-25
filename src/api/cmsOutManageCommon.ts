import http from '@/utils/http'

import { Api } from '@ekp-infra/common'

const api = {
  getNav: Api.build('/cmsOutManageCommon/getNav', http)
}

export default api