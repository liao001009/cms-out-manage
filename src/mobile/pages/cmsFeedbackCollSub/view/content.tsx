import React from 'react'
import { Module } from '@ekp-infra/common'
import { Loading } from '@lui/core'

const ViewContent = Module.getComponent('cms-out-imformation', 'CmsFeedBackCollSubView', { loading: <Loading /> })

const Content = (props) => {
  return (
    <ViewContent {...props} />
  )
}
export default Content