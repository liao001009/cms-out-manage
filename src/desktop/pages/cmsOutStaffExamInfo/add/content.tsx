import React from 'react'
import { Module } from '@ekp-infra/common'
import { Loading } from '@lui/core'

const AddContent = Module.getComponent('cms-out-report', 'CmsOutStaffExamInfoAdd', { loading: <Loading /> })

const Content = (props) => {
  return (
    <AddContent {...props} />
  )
}
export default Content