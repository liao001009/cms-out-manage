import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*工单*/
export interface ICmsOutOrderMain extends IBaseType {
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
  //工单
  fdColRu8r8e: string
  //操作类型
  fdOperateType: string
  //分配处理人
  fdDistriHandler: Partial<IOrgElement>
  //人员信息
  fdColE9l6tb: string
  //姓名
  fdStaffName: any
  //工单类型
  fdOrderType: string
  //各类系统默认账号
  fdDefaultAccount: string
  //当前账号信息
  fdColZtykad: string
  //姓名拼音
  fdNamePinyin: string
  //性别
  fdSex: string
  //身份证号
  fdCardNo: string
  //邮箱
  fdEmail: string
  //手机号
  fdMobile: string
  //账号
  fdAccount: string
  //用户ID
  fdUserId: string
  //角色ID
  fdRoleId: string
  //虚拟机ID
  fdVirId: string
  //虚拟机IP
  fdVirIp: string
  //工单处理结果
  fdCol3yql1k: string
  //账号
  fdAccEdit: string
  //虚拟机关联类型
  fdVirRelaType: string
  //用户ID
  fdUserIdEdit: string
  //角色ID
  fdRoleIdEdit: string
  //虚拟机ID
  fdVirIdEdit: string
  //账号状态
  fdAccStatusEdit: string
  //虚拟机关联类型
  fdVirRelaTypeEdit: string
  //工单状态
  fdOrderStatus: string
  //虚拟机IP
  fdVirIpEdit: string
  //工位
  fdStation: string
  //工位
  fdStaEdit: string
  //网络权限
  fdNetworkPrem: string
  //网络权限
  fdNetPremEdit: string
  //工位区域
  fdStationArea: string
  //门禁区域
  fdEntryGuardArea: string
  //门禁范围
  fdEntryGuardScope: string
  //工位区域
  fdStaAreaEdit: string
  //门禁区域
  fdEntryAreaEdit: string
  //门禁范围
  fdEntryScopeEdit: string
  //岗位
  fdPost: any
  //账号状态
  fdAccountStatus: string
  //关联流程
  fdAssProcess: string
}
