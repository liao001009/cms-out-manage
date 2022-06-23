import { createElement as h } from 'react'
import { CellComponent } from '@ekp-infra/render'

const XformImage = (props) => {
  return h(CellComponent, {
    $$id: props.$$id,
    $$componentID: '@elem/xform-image',
    $$hideLoading: true,
    ...props
  })
}

export default XformImage
