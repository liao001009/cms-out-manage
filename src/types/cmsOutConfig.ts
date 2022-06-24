import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*权限配置*/
export interface ICmsOutConfig extends IBaseType {
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
  //工位地点(深圳)
  fdStationSz: Partial<IOrgElement>
  //工位地点(武汉)
  fdStationWh: Partial<IOrgElement>
  //云主机
  fdCloudHost: Partial<IOrgElement>
  //码云
  fdGitee: Partial<IOrgElement>
  //悟空
  fdWukong: Partial<IOrgElement>
  //桌面助手
  fdDesktopAide: Partial<IOrgElement>
  //VPN
  fdVpn: Partial<IOrgElement>
  //门禁(深圳)
  fdEntranceGuardSz: Partial<IOrgElement>
  //门禁(武汉)
  fdEntranceGuardWh: Partial<IOrgElement>
  //网络权限
  fdNetworkPrem: Partial<IOrgElement>
  //权限项目
  fdCol89xt9v: string
  //处理人
  fdColJjn0ko: string
}
