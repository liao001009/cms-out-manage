import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*驻场人员调整*/
export interface ICmsStaffAdjust extends IBaseType {
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
  //驻场人员调整
  fdColW8681j: string
  //主题
  fdSubject: string
  //联系电话
  fdMobile: string
  //当前项目
  fdProject: any
  //当前项目负责人
  fdProjectPrincipal: Partial<IOrgElement>
  //当前内部负责人
  fdInnerPrincipal: Partial<IOrgElement>
  //资源、账号、权限变更
  fdCol1j39ya: string
  //云主机账号调整
  fdCloudHost: string
  //悟空账号调整
  fdWukong: string
  //码云账号调整
  fdGitee: string
  //是否需要物理机
  fdPhysicalMachine: string
  //桌面助手调整
  fdDesktopAide: string
  //是否需要coding账号
  fdCoding: string
  //VPN账号调整
  fdVpn: string
  //网络权限调整
  fdNetworkPrem: string
  //工位处理调整
  fdStation: string
  //门禁处理调整
  fdEntranceGuard: string
  //门禁范围调整
  fdEntranceGuardScope: string
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
  //调整意见
  fdAdjustReason: string
  //调整后项目
  fdAdjustProject: any
  //调整后项目负责人
  fdAdjustProPrincipal: Partial<IOrgElement>
  //调整后内部负责人
  fdAdjustInnerPrincipal: Partial<IOrgElement>
  //完成应用权限调整
  fdAppPerm: string
  //工位地点
  fdStationAddress: string
}
