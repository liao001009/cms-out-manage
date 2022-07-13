// http实例
import { Http } from '@ekp-infra/common'

const sysAuthHttp = Http.build({ modulePrefixName: 'sys-auth' })
const sysLbpmHttp = Http.build({ modulePrefixName: 'sys-lbpm' })


export { sysAuthHttp,sysLbpmHttp }
const http = Http.build({ modulePrefixName: 'cms-out-manage' })
export default http