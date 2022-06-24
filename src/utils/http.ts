// http实例
import { Http } from '@ekp-infra/common'

// const supplierHttp = Http.build({ modulePrefixName: 'cms-out-manage' })
// const projectHttp = Http.build({ modulePrefixName: 'cms-out-manage' })
const sysAuthHttp = Http.build({ modulePrefixName: 'sys-auth' })
// const staffHttp = Http.build({ modulePrefixName: 'cms-out-manage' })

export { sysAuthHttp }
const http = Http.build({ modulePrefixName: 'cms-out-manage' })
export default http