import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*考勤数据*/
export interface ICmsAttendData extends IBaseType {
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
  //项目
  fdProject: any
  //内部责任人
  fdInnerPrincipal: Partial<IOrgElement>
  //生成月度考勤记录
  fdProduce: string
  //本月法定工作日
  fdWorkDays: number
  //考勤年月
  fdMonth: number
  //考勤数据
  fdColW8z81q: string
  //外包人员
  fdOutStaff: any
}
