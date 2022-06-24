//@ts-ignore
import React, { useRef, createRef } from 'react'
import './index.scss'
import { Form } from '@lui/core'
import { useApi, useSystem } from '@/mobile/shared/formHooks'
import XformAppearance from '@/mobile/components/form/XformAppearance'

const MECHANISMNAMES = {
  fdPhoto: 'attachmentDict',
  fdResumeAtt: 'attachmentDict',
  fdSchoolingAtt: 'attachmentDict'
}

const XForm = (props) => {
  const detailForms = useRef({})
  const { formRef: formRef, value: value } = props
  const [form] = Form.useForm()
  // 对外暴露接口
  useApi({
    form,
    formRef,
    value,
    MECHANISMNAMES
  })
  // 内置$$form对象，组件间的内部调用， 长度校验规则，此逻辑禁止移除与修改
  //@ts-ignore
  const { onValuesChange, lengthValidator, ...sysProps } = useSystem({
    props,
    form,
    detailForms
  })
  return (
    <div className="mui-xform">
      <Form form={form} colPadding={false} onValuesChange={onValuesChange}>
        <XformAppearance></XformAppearance>
      </Form>
    </div>
  )
}

export default XForm
