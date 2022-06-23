import React, { useCallback, useMemo } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/supplier-shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsSupplierEvaluate'
// import AddComponent from '@/manage/pages/cmsSupplierEvaluateTemplate/baseList'
import { useAdd } from '@/desktop/supplier-shared/add'
import { $deleteAll } from '@/desktop/supplier-shared/deleteAll'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize, offset } = data

  // 表格列定义
  const columns = useMemo(
    () => [
      /*主题*/
      {
        title: '主题',
        dataIndex: 'fdSubject',
        render: (value) => value
      },
      /*评价人*/
      {
        title: '评价人',
        dataIndex: 'fdAppraiser',
        render: (value) => value && value.fdName
      },
      /*评价周期年份*/
      {
        title: '评价周期年份',
        dataIndex: 'fdYear',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*评价周期季度*/
      {
        title: '评价周期季度',
        dataIndex: 'fdQuarter',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '第1季度'
            },
            {
              value: '2',
              label: '第2季度'
            },
            {
              value: '3',
              label: '第3季度'
            },
            {
              value: '4',
              label: '第4季度'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
      },
      /*文档状态*/
      {
        title: '文档状态',
        dataIndex: 'fdProcessStatus',
        render: (value) => {
          const options = [
            {
              value: '00',
              label: '废弃'
            },
            {
              value: '10',
              label: '草稿'
            },
            {
              value: '11',
              label: '驳回'
            },
            {
              value: '20',
              label: '待审'
            },
            {
              value: '21',
              label: '挂起'
            },
            {
              value: '29',
              label: '异常'
            },
            {
              value: '30',
              label: '结束'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
      },
      /*创建人*/
      {
        title: '创建人',
        dataIndex: 'fdCreator',
        render: (value) => value && value.fdName
      },
      /*创建时间*/
      {
        title: '创建时间',
        dataIndex: 'fdCreateTime',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*undefined*/
      {
        title: '',
        dataIndex: 'lbpm_current_processor',
        render: (value) => value
      },
      /*undefined*/
      {
        title: '',
        dataIndex: 'lbpm_current_node',
        render: (value) => value
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
  const {
    $add: $add,
    // $addClose: $addClose,
    // $addVisible: $addVisible
  } = useAdd('/cmsSupplierEvaluate/add')
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
          history.goto(`/cmsSupplierEvaluate/view/${record.fdId}`)
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
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdYear"
                title="评价周期年份"
              ></Criteria.Calendar>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    text: '不限',
                    value: 'undefined'
                  },
                  {
                    text: 'undefined',
                    value: '1'
                  },
                  {
                    text: 'undefined',
                    value: '2'
                  },
                  {
                    text: 'undefined',
                    value: '3'
                  },
                  {
                    text: 'undefined',
                    value: '4'
                  }
                ]}
                name="fdQuarter"
                title="评价周期季度"
              ></Criteria.Criterion>
              <Criteria.Org orgType={8} title="评价人" name="fdAppraiser.fdId"></Criteria.Org>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    text: '不限',
                    value: 'undefined'
                  },
                  {
                    text: 'undefined',
                    value: '00'
                  },
                  {
                    text: 'undefined',
                    value: '10'
                  },
                  {
                    text: 'undefined',
                    value: '11'
                  },
                  {
                    text: 'undefined',
                    value: '20'
                  },
                  {
                    text: 'undefined',
                    value: '21'
                  },
                  {
                    text: 'undefined',
                    value: '29'
                  },
                  {
                    text: 'undefined',
                    value: '30'
                  }
                ]}
                name="fdProcessStatus"
                title="文档状态"
              ></Criteria.Criterion>
              <Criteria.Criterion
                canMulti={false}
                options={[]}
                name="lbpm_current_processor"
                title=""
              ></Criteria.Criterion>
              <Criteria.Criterion canMulti={false} options={[]} name="lbpm_current_node" title=""></Criteria.Criterion>
              <Criteria.Org orgType={8} title="创建人" name="fdCreator.fdId"></Criteria.Org>
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
                <Operation.Sort key="fdCreateTime" name="fdCreateTime" title="创建时间"></Operation.Sort>
                <Operation.Sort key="fdEvaluatePeriod" name="fdEvaluatePeriod" title="评价周期年"></Operation.Sort>
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
                {/* <AddComponent visible={$addVisible} callback={$addClose}></AddComponent> */}
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
