import React from 'react'
import { Module } from '@ekp-infra/common'
import { Loading } from '@lui/core'

const AddContent = Module.getComponent('cms-out-supplier', 'CmsContractInfoAdd', { loading: <Loading /> })

const Content = (props) => {
  return (
    <AddContent {...props} />
  )
}
export default Content