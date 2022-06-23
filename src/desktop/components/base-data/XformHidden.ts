import { createElement as h } from 'react'
import { CellComponent } from '@ekp-infra/render'

const XformHidden = (props) => {
  return h(CellComponent, {
    $$id: props.$$id,
    $$componentID: '@elem/xform-hidden',
    $$hideLoading: true,
    ...props
  })
}

export default XformHidden
