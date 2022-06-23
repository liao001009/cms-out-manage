import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*供应商评价*/
export interface ICmsSupplierEvaluate extends IBaseType {
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
  //供应商评价
  fdColVutko7: string
  //评价周期年
  fdEvaluatePeriod: number
  //评价人
  fdAppraiser: Partial<IOrgElement>
  //挑选供应商
  fdSuppliers: any
  //评价周期季度
  fdQuarter: string
  //评价周期年份
  fdYear: number
  //评价周期
  fdColNivfbr: string
}
