import { createElement as h } from 'react'
import { CellComponent } from '@ekp-infra/render'

const XformSwitch = (props) => {
  return h(CellComponent, {
    $$id: props.$$id,
    $$componentID: '@elem/xform-switch',
    $$hideLoading: true,
    ...props
  })
}

export default XformSwitch
