import React, { useCallback, useMemo } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsSupplierEvalScore'
// import AddComponent from '@/manage/pages/cmsSupplierEvalScoreTemplate/baseList'
import { useAdd } from '@/desktop/shared/add'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import './index.scss'
import { Auth } from '@ekp-infra/common'
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
      /*供应商*/
      {
        title: '供应商',
        dataIndex: 'fdSupplier',
        render: (value) => value
      },
      /*评价人*/
      {
        title: '评价人',
        dataIndex: 'fdAppraiser',
        render: (value) => value && value.fdName
      },
      /*所属框架*/
      {
        title: '所属框架',
        dataIndex: 'fdFrame',
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
      /*总分*/
      {
        title: '总分',
        dataIndex: 'fdTotalScore',
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
  } = useAdd('/cmsSupplierEvalScore/add')
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
          history.goto(`/cmsSupplierEvalScore/view/${record.fdId}`)
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
              <Criteria.Input name="fdSupplier" title="供应商"></Criteria.Input>
              <Criteria.Org orgType={8} title="评价人" name="fdAppraiser.fdId"></Criteria.Org>
              <Criteria.Input name="fdFrame" title="所属框架"></Criteria.Input>
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
                  }
                ]}
                name="fdCooperationStatus"
                title="供应商合作状态"
              ></Criteria.Criterion>
              <Criteria.InputNum name="fdTotalScore" title="总分"></Criteria.InputNum>
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
                <Auth.Auth
                  authURL='/supplier/cmsSupplierEvalScore/add'
                  authModuleName='cms-out-manage'
                  unauthorizedPage={null}
                >
                  <Button type="primary" onClick={handleAdd}>
                    新建
                  </Button>
                </Auth.Auth>
                <Auth.Auth
                  authURL='/supplier/cmsSupplierEvalScore/delete'
                  authModuleName='cms-out-manage'
                  unauthorizedPage={null}
                >
                  <Button type="default" onClick={handleDeleteAll}>
                    批量删除
                  </Button>
                </Auth.Auth>
                {/* <AddComponent visible={$addVisible} callback={$addClose}></AddComponent> */}
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
