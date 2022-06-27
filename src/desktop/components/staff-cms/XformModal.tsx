import { IContentViewProps } from '@ekp-runtime/module'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input, Message, Modal, Pagination } from '@lui/core'
import Table, { useTable } from '@elem/mk-table'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import './index.scss'
import { criertiaObj } from '@/desktop/common'

export enum EShowStatus {
  /** 查看 */
  'view' = 'view',
  /** 编辑 */
  'edit' = 'edit',
  /** 添加 */
  'add' = 'add'
}

export interface IProps extends IContentViewProps {
  /** 回调调整明细表事件 */
  onChangeProps?: (v, r) => void
  /** function */
  onChange?: (v) => void
  /** 组件状态 */
  showStatus?: EShowStatus
  /** 组件数据 */
  value?: any
  /** 请求体 */
  apiRequest?: any
  /** 表格表头 */
  columnsProps?: Array<any>
  /** 选中名称 */
  chooseFdName?: string
  /** 弹窗标题 */
  modalTitle?: string
  /** 渲染筛选 */
  criteriaKey?: any
  /** apiKey */
  apiKey: any
  /** apiName */
  apiName: string
  /** 要改变的筛选项 */
  criteriaProps?: any
  /** 行号 */
  rowIndex?: number
  /** 默认的表格列筛选 */
  defaultTableCriteria?:any
}

const XformModal: React.FC<IProps> = (props) => {

  const {
    onChange,
    showStatus,
    value,
    criteriaKey,
    query = {},
    queryChange,
    history,
    chooseFdName = '',
    columnsProps = [],
    modalTitle = '标题',
    apiKey,
    apiName,
    onChangeProps,
    criteriaProps = [],
    rowIndex,
    defaultTableCriteria={}
  } = props
  const [listData, setListData] = useState<any>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [fdName, setFdName] = useState<string>(value && value.fdName || '')
  /** 组装表格列头筛选项 */
  const getDefaultTableColumns = useCallback(()=>{
    if(Object.keys(defaultTableCriteria).length<=0)return {}
    const newConditions = {}
    Object.keys(defaultTableCriteria).forEach(key=>{
      const newConditionsKey = {}
      newConditionsKey[defaultTableCriteria[key]['searchKey']] = defaultTableCriteria[key]['searchValue']
      newConditions[key] = defaultTableCriteria[key] ?  newConditionsKey : undefined
    })
    return newConditions
  },[])
  useEffect(() => {
    if (showStatus === EShowStatus.add || showStatus === EShowStatus.edit) {
      getListData({
        conditions:{...getDefaultTableColumns()}
      })
    }
  }, [])

  const getListData = async (data) => {
    try {
      const res = await apiKey[apiName](data)
      setListData(res.data)
    } catch (error) {
      Message.error(error)
    }
  }
  // 表格列定义
  const columns = useMemo(() => columnsProps, [])
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
          onChange && onChange(record)
          setVisible(false)
          setFdName(record[chooseFdName])
          // @ts-ignore
          onChangeProps && onChangeProps(record, rowIndex)
        }
      }
    },
    [history]
  )
  /** 筛选 */
  const handleCriteriaChange = useCallback(
    (value, values) => {
      const conditions = $reduceCriteria(query, values)
      const newConditions = {}
      criteriaProps.length && criteriaProps.map(item => {
        newConditions[item] = conditions[item] ? {
          $contains: conditions[item]['$eq']
        } : undefined
      })
      getListData({
        ...query,
        conditions: { ...conditions, ...newConditions }
      })
    },
    [query]
  )
  return (
    <div>
      <div>
        {
          showStatus === 'edit' || showStatus === 'add' ? (
            <Input placeholder='请输入' readOnly onClick={() => setVisible(true)} value={fdName} />
          ) : (
            <span>{value[chooseFdName]}</span>
          )
        }
      </div>
      <Modal
        visible={visible}
        destroyOnClose={true}
        title={modalTitle}
        mask={true}
        width={'1100px'}
        className='record-modal'
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className="lui-template-list-table">
          <Criteria key="criteria" expandable={true} onChange={handleCriteriaChange}>
            {
              criteriaKey ? criertiaObj[criteriaKey] : null
            }
          </Criteria>
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
