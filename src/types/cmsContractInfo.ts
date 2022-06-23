import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*合同信息*/
export interface ICmsContractInfo extends IBaseType {
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
  //合同信息
  fdColGekjjh: string
  //合同名称
  fdContractName: string
  //合同类型
  fdContractType: string
  //合同开始日期
  fdStartDate: number
  //合同结束日期
  fdEndDate: number
  //附件
  fdAtt: string
  //供应商名称
  fdSupplier: any
  //合同总金额
  fdTotalAmount: number
  //（万元）
  fdColCc0nfd: string
  //所属框架
  fdFrame: any
  //合同签订方式
  fdSignWay: string
}
