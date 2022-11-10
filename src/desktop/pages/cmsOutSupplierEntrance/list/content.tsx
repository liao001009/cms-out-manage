import React from 'react'
import { Module } from '@ekp-infra/common'
import { Loading } from '@lui/core'

const ListContent = Module.getComponent('cms-out-report', 'CmsOutSupplierEntranceList', { loading: <Loading /> })

const Content = (props) => {
  return (
    <ListContent {...props} />
  )
}
export default Content