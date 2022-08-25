import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*加班申请*/
export interface ICmsOverWork extends IBaseType {
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
  //加班申请
  fdColGpsake: string
  //主题
  fdSubject: string
  //所在项目
  fdProject: any
  //加班时间
  fdCol8cv0ys: string
  //从
  fdCol3fjpwh: string
  //到
  fdColAqazir: string
  //共计
  fdColL43ftk: string
  //工作日
  fdColTeg36l: string
  //工作日
  fdOverWork: number
  //加班开始时间
  fdBeginTime: number
  //加班结束时间
  fdEndTime: number
  //加班事由
  fdOverWorkReason: string
  //附件
  fdOverWorkFile: string
  //项目负责人
  fdProjectPrincipal: Partial<IOrgElement>
  //内部责任人
  fdInnerPrincipal: Partial<IOrgElement>
}
