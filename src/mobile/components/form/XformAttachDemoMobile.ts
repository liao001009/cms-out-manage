import { createElement as h } from 'react'
import { CellComponent } from '@ekp-infra/render'

const XformAttachDemoMobile = (props) => {
  return h(CellComponent, {
    $$id: props.$$id,
    $$componentID: '@elem/xform-attach-demo~mobile',
    $$hideLoading: true,
    ...props
  })
}

export default XformAttachDemoMobile
