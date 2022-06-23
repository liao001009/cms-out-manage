import React, { useCallback, useMemo } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/supplier-shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsContractInfo'
import { useAdd } from '@/desktop/supplier-shared/add'
import { $deleteAll } from '@/desktop/supplier-shared/deleteAll'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize, offset } = data

  // 表格列定义
  const columns = useMemo(
    () => [
      /*合同名称*/
      {
        title: '合同名称',
        dataIndex: 'fdContractName',
        render: (value) => value
      },
      /*所属框架*/
      {
        title: '所属框架',
        dataIndex: 'fdFrame',
        render: (value) => value
      },
      /*供应商名称*/
      {
        title: '供应商名称',
        dataIndex: 'fdSupplier',
        render: (value) => value
      },
      /*合同开始日期*/
      {
        title: '合同开始日期',
        dataIndex: 'fdStartDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*合同结束日期*/
      {
        title: '合同结束日期',
        dataIndex: 'fdEndDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*合同总金额*/
      {
        title: '合同总金额',
        dataIndex: 'fdTotalAmount',
        render: (value) => value
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
  const { tableProps, selectedRows } = useTable({
    // 数据源
    data: content,
    // 显示序号列
    serial: true,
    // 列定义
    columns,
    // 支持行选择
    rowSelection: true,
    // 表格搜索，含筛选、排序
    onChange: (newQuery) => {
      queryChange({
        ...query,
        conditions: {
          ...query.conditions,
          ...newQuery.conditions
        },
        sorts: { ...query.sorts, ...newQuery.sorts }
      })
    }
  })
  console.log(selectedRows)

  /** 操作函数集 */

  //新建
  const { $add: $add } = useAdd('/cmsContractInfo/add')
  const handleAdd = useCallback(
    (event) => {
      event.stopPropagation()
      $add({
        history: history,
        api: api,
        selectedRows: selectedRows,
        refresh: refresh
      })
    },
    [history, selectedRows, refresh]
  )
  //批量删除
  const handleDeleteAll = useCallback(
    (event) => {
      event.stopPropagation()
      $deleteAll({
        api: api,
        selectedRows: selectedRows,
        refresh: refresh
      })
    },
    [history, selectedRows, refresh]
  )

  /** 搜索 */
  const handleSearch = useCallback((keyword: string) => {
    queryChange({
      ...query,
      conditions: {
        ...query.conditions,
        fdSubject: { $contains: keyword.trim() }
      }
    })
  }, [])

  /** 筛选 */
  const handleCriteriaChange = useCallback(
    (value, values) => {
      const conditions = $reduceCriteria(query, values)
      queryChange &&
        queryChange({
          ...query,
          conditions
        })
    },
    [query]
  )

  /** 排序 */
  const handleSorter = useCallback(
    (curSorter, allSorter) => {
      // 排序
      if (curSorter.type === 'sort') {
        queryChange &&
          queryChange({
            ...query,
            // 排序
            sorts: allSorter
              .filter((sorter) => sorter.type === 'sort' && sorter.value)
              .reduce((acc, cur) => {
                acc[cur.name] = cur.value
                return acc
              }, {})
          })
      }
      // 分页
      if (curSorter.type === 'paging') {
        queryChange &&
          queryChange({
            ...query,
            pageNo: curSorter.value || 1
          })
      }
    },
    [query, queryChange]
  )

  /** 分页操作 */
  const handlePage = useCallback(
    (pageNo: number, pageSize: number) => {
      queryChange({ ...query, pageNo, pageSize })
    },
    [query]
  )

  const onRowClick = useCallback(
    (record) => {
      return {
        onClick: () => {
          history.goto(`/cmsContractInfo/view/${record.fdId}`)
        }
      }
    },
    [history]
  )

  return (
    <React.Fragment>
      <div className="lui-template-list">
        <div className="lui-template-list-criteria">
          <div className="left">
            {/* 搜索 */}
            <Input.Search allowClear placeholder="请输入关键词搜索" onSearch={handleSearch} />
          </div>
          <div className="right">
            {/* 筛选器 */}
            <Criteria key="criteria" onChange={handleCriteriaChange}>
              <Criteria.Input name="fdFrame" title="所属框架"></Criteria.Input>
              <Criteria.Input name="fdSupplier" title="供应商名称"></Criteria.Input>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdStartDate"
                title="合同开始日期"
              ></Criteria.Calendar>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdEndDate"
                title="合同结束日期"
              ></Criteria.Calendar>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdCreateTime"
                title="创建时间"
              ></Criteria.Calendar>
            </Criteria>
          </div>
        </div>
        <div className="lui-template-list-toolbar">
          <div className="left">
            <Operation key="operation" onChange={handleSorter}>
              {/* 排序 */}
              <Operation.SortGroup>
                <Operation.Sort key="fdStartDate" name="fdStartDate" title="合同开始日期"></Operation.Sort>
                <Operation.Sort key="fdEndDate" name="fdEndDate" title="合同结束日期"></Operation.Sort>
                <Operation.Sort key="fdCreateTime" name="fdCreateTime" title="创建时间"></Operation.Sort>
              </Operation.SortGroup>
              {totalSize && (
                <Operation.Paging name="pageNo" value={offset / pageSize} pageSize={pageSize} total={totalSize} />
              )}
            </Operation>
          </div>
          <div className="right">
            <Space>
              <Button onClick={refresh}>
                <Icon name="redo" />
              </Button>
              {/* 操作栏 */}
              <React.Fragment>
                <Button type="primary" onClick={handleAdd}>
                  新建
                </Button>
                <Button type="default" onClick={handleDeleteAll}>
                  批量删除
                </Button>
              </React.Fragment>
            </Space>
          </div>
        </div>
        <div className="lui-template-list-table">
          <Table loading={status === 'loading'} {...tableProps} onRow={onRowClick} />
        </div>
        <div className="lui-template-list-page">
          {totalSize ? (
            <Pagination
              showQuickJumper
              showSizeChanger
              refresh={true}
              total={totalSize}
              pageSize={pageSize}
              onChange={handlePage}
              onRefresh={refresh}
            />
          ) : null}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Content
