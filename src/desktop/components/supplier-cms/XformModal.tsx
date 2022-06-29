import { IContentViewProps } from '@ekp-runtime/module'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input, Message, Modal,Pagination } from '@lui/core'
import Table, { useTable } from '@elem/mk-table'

import api from '@/api/cmsSupplierInfo'

export enum EShowStatus {
  /** 查看 */
  'view' = 'view',
  /** 编辑 */
  'edit' = 'edit',
  /** 添加 */
  'add' = 'add'
}

export interface IProps extends IContentViewProps {
  /** function */
  onChange?:(v)=>void
  /** 组件状态 */
  showStatus?:EShowStatus
  /** 组件数据 */
  value?:any
}

const XformModal : React.FC<IProps> = (props) =>{
  const { onChange,showStatus,value ,query,queryChange,history} = props 
  const [listData,setListData] = useState<any>({})
  const [visible,setVisible] = useState<boolean>(false)
  const [suppName,setSuppName] = useState<string>(value && value.fdName || '')

  useEffect(()=>{
    getListData()
  },[])

  const getListData = async () => {
    try {
      const res = await api['listSupplierInfo']({})
      setListData(res.data)
    } catch (error) {
      Message.error(error)
    }
  }
  // 表格列定义
  const columns = useMemo(
    () => [
      /*供应商名称*/
      {
        title: '供应商名称',
        dataIndex: 'fdSupplierName',
        render: (value) => value
      },
      /*组织机构代码*/
      {
        title: '组织机构代码',
        dataIndex: 'fdOrgCode',
        render: (value) => value
      },
      /*供应商合作状态*/
      {
        title: '供应商合作状态',
        dataIndex: 'fdCooperationStatus',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '未签合同'
            },
            {
              value: '2',
              label: '已签合同'
            },
            {
              value: '3',
              label: '合同过期'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
      },
      /*创建时间*/
      {
        title: '创建时间',
        dataIndex: 'fdCreateTime',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      }
    ],
    []
  )
  // 表格hook
  const { tableProps } = useTable({
    // 数据源
    data: listData.content || [],
    // 列定义
    columns,
    // 显示序号列
    serial: true,
    // 支持行选择
    rowSelection: false,
  })
  // 分页操作 
  const handlePage = useCallback(
    (pageNo: number, pageSize: number) => {
      queryChange({ ...query, pageNo, pageSize })
    },
    [query]
  )
  // 行点击
  const onRowClick = useCallback(
    (record) => {
      return {
        onClick: () => {
          onChange && onChange({
            fdId:record.fdId
          })
          setVisible(false)
          setSuppName(record.fdSupplierName)
        }
      }
    },
    [history]
  )
  return (
    <div>
      <div>
        {
          showStatus === 'edit' || showStatus === 'add' ? (
            <Input placeholder='请输入' readOnly onClick={()=>setVisible(true)} value={suppName}/>
          ) : (
            <span>{value && value.fdName}</span>
          )
        }
      </div>
      <Modal
        visible={visible}
        destroyOnClose={true}
        title={'选择记录'}
        mask={true}
        width={'800px'}
        className='record-modal'
        onCancel={()=>setVisible(false)}
      >
        <div className="lui-template-list-table">
          <Table {...tableProps} onRow={onRowClick} />
        </div>
        <div className="lui-template-list-page">
          {listData.totalSize ? (
            <Pagination
              total={listData.totalSize}
              pageSize={listData.pageSize}
              onChange={handlePage}
            />
          ) : null}
        </div>
      </Modal>
    </div>
  )
}

export default XformModal
