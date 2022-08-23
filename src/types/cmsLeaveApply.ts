import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*调休/请假申请*/
export interface ICmsLeaveApply extends IBaseType {
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
  //调休/请假申请
  fdCol3ymepp: string
  //主题
  fdSubject: string
  //所在项目
  fdProject: any
  //请假类型
  fdLeaveType: string
  //附件
  fdLeaveFile: string
  //请假事由
  fdLeaveReason: string
  //请假时间
  fdColTm12yf: string
  //请假开始时间
  fdBeginTime: number
  //从
  fdColFzt93w: string
  //到
  fdColQmvxbq: string
  //请假结束时间
  fdEndTime: number
  //共计
  fdColT1y2ml: string
  //工作日
  fdLeaveDay: number
  //工作日
  fdColZoetdw: string
  //项目负责人
  fdProjectPrincipal: Partial<IOrgElement>
  //内部责任人
  fdInnerPrincipal: Partial<IOrgElement>
}
