import { IContentViewProps } from '@ekp-runtime/module'
import React, { useCallback, useEffect, useState } from 'react'

import { Select } from '@lui/core'
import api from '@/api/cmsFrameInfo'

const { Option } = Select

export enum EShowStatus {
  /** 查看 */
  'view' = 'view',
  /** 编辑 */
  'edit' = 'edit'
}

export interface IProps extends IContentViewProps {
  /** function */
  onChange?:(v)=>void
  /** 组件状态 */
  showStatus?:EShowStatus
  /** 组件数据 */
  value?:any
}

const CMSXformRelation : React.FC<IProps> = (props) =>{
  console.log('props====',props)
  const { onChange,showStatus,value } = props 
  const [frameArray,setFrameArray] = useState<any>([])

  useEffect(()=>{
    init()
  },[])
  
  const init = async () =>{
    try {
      const res = await api.listFrameInfo({})
      setFrameArray(res.data.content)
    } catch (error) {
      console.warn('框架类型出错',error)
    }
  }
  const handleChange = useCallback((value) => {
    onChange && onChange({
      fdId:value
    })
  }, [])

  return (
    <div>
      {
        showStatus === 'edit' ? (
          <Select
            placeholder="请选择"
            onChange={handleChange}
            defaultValue={value && value.fdId}
          >
            {
              frameArray.map(item=>(
                <Option key={item.fdId} value={item.fdId}>{item.fdName}</Option>
              ))
            }
          </Select>
        ) : (
          <span>{value.fdName}</span>
        )
      }
      
    </div>
  )
}

export default CMSXformRelation
