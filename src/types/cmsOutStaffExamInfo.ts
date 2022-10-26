import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*外包人员考核信息查询*/ export interface ICmsOutStaffExamInfo extends IBaseType {
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
  //外包人员考核信息查询
  fdColGwx10i: string
  //考核周期
  fdColKvnlnf: string
  //项目
  fdProject: any
  //选择季度
  fdQuarter: string
  //选择年
  fdYear: number
  //人员
  fdStaff: any
  //供应商
  fdSupplier: any
  //所属团队
  fdBelongTime: Partial<IOrgElement>
  //所属部门
  fdBelongDept: Partial<IOrgElement>
}
