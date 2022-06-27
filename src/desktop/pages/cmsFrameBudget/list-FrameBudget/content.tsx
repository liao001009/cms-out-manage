import React, { useCallback, useMemo } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Button, Space, Pagination } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsFrameBudget'
import { useAdd } from '@/desktop/shared/add'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import { Auth } from '@ekp-infra/common'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize } = data

  // 表格列定义
  const columns = useMemo(
    () => [
      /*预算年度*/
      {
        title: '预算年度',
        dataIndex: 'fdBudgetYear',
        render: (value) => value && mk.getFormatTime(value, 'YYYY')
      },
      /*预算执行开始日期*/
      {
        title: '预算执行开始日期',
        dataIndex: 'fdStartDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
      },
      /*预算执行结束日期*/
      {
        title: '预算执行结束日期',
        dataIndex: 'fdEndDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
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
  const { $add: $add } = useAdd('/cmsFrameBudget/add')
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
  // const handleSearch = useCallback((keyword: string) => {
  //   queryChange({
  //     ...query,
  //     conditions: {
  //       ...query.conditions,
  //       fdBudgetYear: { $contains: keyword.trim() }
  //     }
  //   })
  // }, [])

  /** 筛选 */
  const handleCriteriaChange = useCallback(
    (value, values) => {
      const conditions = $reduceCriteria(query, values)
      console.log('conditions', conditions)

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
          history.goto(`/cmsFrameBudget/view/${record.fdId}`)
        }
      }
    },
    [history]
  )

  return (
    <React.Fragment>

      <div className="lui-template-list">
        <div className="lui-template-list-criteria">
          {/* 搜索 */}
          {/* <div className="left">
            <Input.Search allowClear placeholder="请输入关键词搜索" onSearch={handleSearch} />
          </div> */}
          <div className="right">
            {/* 筛选器 */}
            <Criteria key="criteria" onChange={handleCriteriaChange}>
              {/* <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdBudgetYear"
                title="预算年度"
              ></Criteria.Calendar> */}
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdStartDate"
                title="预算执行开始日期"
              ></Criteria.Calendar>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdEndDate"
                title="预算执行结束日期"
              ></Criteria.Calendar>
            </Criteria>
          </div>
        </div>
        <div className="lui-template-list-toolbar">
          <div className="left">
            <Operation key="operation" onChange={handleSorter}>
              {/* 排序 */}
              <Operation.SortGroup>
                <Operation.Sort key="fdCreateTime" name="fdCreateTime" title="创建时间"></Operation.Sort>
              </Operation.SortGroup>
            </Operation>
          </div>
          <div className="right">
            <Space>
              <Button onClick={refresh}>
                <Icon name="redo" />
              </Button>
              {/* 操作栏 */}
              <React.Fragment>
                <Auth.Auth
                  authURL='basedata/cmsFrameBudget/listFrameBudget'
                  authModuleName='cms-out-manage'
                  unauthorizedPage={null}
                >
                  <Button type="primary" onClick={handleAdd}>
                    新建
                  </Button>
                </Auth.Auth>
                <Auth.Auth
                  authURL='basedata/cmsFrameBudget/listFrameBudget'
                  authModuleName='cms-out-manage'
                  unauthorizedPage={null}
                >
                  <Button type="default" onClick={handleDeleteAll}>
                    批量删除
                  </Button>
                </Auth.Auth>
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
