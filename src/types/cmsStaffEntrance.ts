import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*入场申请*/
export interface ICmsStaffEntrance extends IBaseType {
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
  //入场申请
  fdColW8681j: string
  //主题
  fdSubject: string
  //联系电话
  fdMobile: string
  //所属系统/项目
  fdProject: any
  //项目性质
  fdProjectNature: string
  //所属部门
  fdBelongDept: Partial<IOrgElement>
  //项目负责人
  fdProjectPrincipal: Partial<IOrgElement>
  //所属组/团队
  fdBelongTeam: Partial<IOrgElement>
  //内部负责人
  fdInnerPrincipal: Partial<IOrgElement>
  //入场供应商
  fdSupplier: any
  //预计到岗日期
  fdComeDate: number
  //预计离岗日期
  fdLeaveDate: number
  //优先级
  fdPriority: string
  //资源、账号、权限开通
  fdCol1j39ya: string
  //是否需要云主机账号
  fdCloudHost: string
  //是否需要悟空账号
  fdWukong: string
  //是否需要码云账号
  fdGitee: string
  //是否需要物理机
  fdPhysicalMachine: string
  //是否需要桌面助手账号
  fdDesktopAide: string
  //是否需要coding账号
  fdCoding: string
  //具体原因
  fdSpecificReason: string
  //是否需要VPN
  fdVpn: string
  //是否需要开通网络权限
  fdNetworkPrem: string
  //是否需要工位
  fdStation: string
  //是否需要门禁
  fdEntranceGuard: string
  //门禁范围
  fdEntranceGuardScope: string
  //驻场原因
  fdOnSiteReason: string
  //具体说明
  fdSpecify: string
  //供应商上传资料
  fdColLdxp2n: string
  //资料上传
  fdAtt: string
  //（需分别上传包含“身份证”、“保密承诺书签字”字样的扫描）
  fdColY3kagp: string
  //模板下载
  fdAttTemplate: string
  //工位地点
  fdStationAddress: string
}
