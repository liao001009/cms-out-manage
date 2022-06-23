import { IBaseType } from '@ekp-infra/common/dist/types'
import { IOrgElement } from '@ekp-infra/common/dist/types'

/*供应商评价打分*/
export interface ICmsSupplierEvalScore extends IBaseType {
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
  // //主题
  // fdSubject: string
  //评价周期
  fdEvaluatePeriod: number
  //供应商
  fdSupplier: any
  //评价人
  fdAppraiser: Partial<IOrgElement>
  //所属框架
  fdFrame: any
  //供应商合作状态
  fdCooperationStatus: string
  //外包供应商服务情况季度评价表
  fdColQntfs7: string
  //维度
  fdColW6s4mj: string
  //评价指标
  fdColBdpczw: string
  //说明
  fdColBdo7is: string
  //满分值
  fdColSkvwsf: string
  //得分
  fdColNv0ha3: string
  //中选率
  fdColToksgh: string
  //需求响应率
  fdColN4plor: string
  //评价期间中选率最高的满分，完全未中选的0分，其余在此区间折算
  fdColBtjk15: string
  //以评价期间发出的订单数为基数，按响应数量折算
  fdColI2ms7a: string
  //10
  fdColQaqeoj: string
  //这里是文本内容
  fdCol2gm849: string
  //5
  fdColDfdgaw: string
  //支持力度
  fdCol032msh: string
  //交付能力
  fdCol2mwbza: string
  //入场人员离职率
  fdColDcho08: string
  //中选人员入场率
  fdColO4zah9: string
  //考察订单获取的真实性，以中选人数为基数，按实际入场人数折算，按项目数累计求平均值
  fdColGiuupg: string
  //10
  fdCol8tj92n: string
  //5
  fdColBlayym: string
  //10
  fdCol279b52: string
  //考察人员稳定性，以离职人员数（不含主动淘汰人数）/入场人数计算，以当前季度所有框架内供应商平均入场人员离职率为基准，评价
  fdColRkxrvk: string
  //考察交付效率，以需求订单中明确的交付时间要求为基准，在交付时间内完成所有人员交付的满分，超期超过1倍时间扣2.5分，超过
  fdCol9kei7g: string
  //人员交付周期/时效
  fdColA2az4b: string
  //入场人员淘汰率
  fdCol7napv9: string
  //考察人员质量，以主动淘汰人员数/入场人数计算，以当前季度所有框架内供应商平均入场人员淘汰率为基准，评价期内离职率不大于基
  fdColUg1cxg: string
  //10
  fdColYymz0n: string
  //人员管理
  fdColHafds7: string
  //项目完成质量
  fdCol7tei1f: string
  //职场行为规范情况
  fdCol7602p3: string
  //服务综合质量评价
  fdColAz5k6c: string
  //被行政人员、保安人员等发现不遵守职场行为规范的情况，每发现一人次扣0.5分，重复发现加倍扣分
  fdCol8eqj4o: string
  //项目尾款支付时由项目经理基于供应商评价表作评价，根据评价表得分折算，按项目数累计求平均值
  fdColDj2vox: string
  //10
  fdColJhii95: string
  //40
  fdColIp3bzw: string
  //需求响应率得分
  fdDemandResponseScore: number
  //中选率得分
  fdSelectedScore: number
  //中选人员入场率得分
  fdEntranceScore: number
  //人员交付周期得分
  fdDeliveryPeriodScore: number
  //入场人员离职率得分
  fdDimissionScore: number
  //入场人员淘汰率得分
  fdEliminateScore: number
  //职场行为规范情况得分
  fdSpecificationScore: number
  //服务综合质量评价得分
  fdQualityEvaluateScore: number
  //100
  fdCol1st9bo: string
  //总分
  fdColOciyew: string
  //总分
  fdTotalScore: number
  //评价周期年份
  fdYear: number
  //评价周期季度
  fdQuarter: string
  //评价周期
  fdColW9zj7f: string
}
