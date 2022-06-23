import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*附件模板配置*/
export interface ICmsStaffAttConfig extends IBaseType {
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
  //入场申请附件模板
  fdEntranceAtt: string
  //人员调整附件模板
  fdAdjustAtt: string
  //附件模板配置
  fdCol04dgh5: string
}
