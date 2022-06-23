import { Loading, Modal } from '@lui/core'
import { Module } from '@ekp-infra/common'
const Export = Module.getComponent('sys-mech-transport', 'Export', { loading: <Loading /> })
import React, { FC } from 'react'

interface IProps {
  /**弹窗的显隐状态 */
  visible: boolean
  /**更新显隐 */
  setVisible: any
  /**选中导出数据总数 */
  totalSize?: number
  fdEntityName: string
  /**当前页码 */
  pageNo?: number
  /**当前页面数量 */
  pageSize?: number
  /**筛选条件 */
  conditions?: any
}
const ExportModal: FC<IProps> = (props: IProps) => {
  const { visible, setVisible, totalSize = 0, pageNo = 1, pageSize = 20, conditions = null,fdEntityName } = props
  const params = {
    totalSize,
    pageNo,
    pageSize,
    conditions
  }
  return (
    <Modal
      visible={visible}
      modalType={'oversized'}
      onCancel={() => { setVisible(false) }}
      onOk={() => { setVisible(false) }}
      footer={null}
    >
      <Export
        fdEntityName={fdEntityName}
        params={params}
        isMasterTemplate={true}
        moduleName='sys.rule'
      />
    </Modal>
  )
}

export default ExportModal