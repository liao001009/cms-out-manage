import React from 'react'
import { Module } from '@ekp-infra/common'
import { Loading } from '@lui/core'

const EditContent = Module.getComponent('cms-out-supplier', 'CmsQuitRegisterEdit', { loading: <Loading /> })

const Content = (props) => {
  return (
    <EditContent {...props} />
  )
}
export default Content