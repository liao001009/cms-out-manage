import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*系统账号查询*/
export interface ICmsOutAccountQuery extends IBaseType {
  //创建人
  fdCreator: Partial<IOrgElement>
  //创建时间
  fdCreateTime: number
  //创建人部门
  fdCreatorDept: Partial<IOrgElement>
  //修改人
  fdAlter: Partial<IOrgElement>
  //修改时间
  fdAlterTime: number
  //拥有者
  fdOwner: Partial<IOrgElement>
  //拥有者部门
  fdOwnerDept: Partial<IOrgElement>
  //文档标题
  fdSubject: string
  //文档状态
  fdProcessStatus: string
  //发布时间
  fdPublishedTime: number
  //流程模板ID
  fdProcessTemplateId: string
  //应用表单ID
  fdXformId: string
  //对应版本
  fdVersion: string
  //主键ID
  fdId: string
  //系统账号查询
  fdColFl587g: string
  //身份证号
  fdCardNo: string
  //云主机/桌面云账号
  fdCloudHostAcc: string
  //桌面助手账号
  fdDeskAssAcc: string
  //Coding/Devops账号
  fdCodingAcc: string
  //VPN账号
  fdVpnAcc: string
  //工位
  fdStation: string
  //门禁
  fdEntranceGuard: string
  //网络权限
  fdNetworkPrem: string
  //手机号
  fdPhone: string
  //姓名
  fdStaffName: any
}
