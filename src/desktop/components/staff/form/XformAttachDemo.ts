import { createElement as h } from 'react'
import { CellComponent } from '@ekp-infra/render'

const XformAttachDemo = (props) => {
  return h(CellComponent, {
    $$id: props.$$id,
    $$componentID: '@elem/xform-attach-demo',
    $$hideLoading: true,
    ...props
  })
}

export default XformAttachDemo
