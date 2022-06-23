import React, { useCallback, useMemo } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsOutStaffInfo'
import { useAdd } from '@/desktop/shared/add'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize } = data

  // 表格列定义
  const columns = useMemo(
    () => [
      /*组织信息/所属供应商*/
      {
        title: '组织信息/所属供应商',
        dataIndex: 'fdSupplier',
        render: (value) => value && value.fdName
      },
      /*姓名*/
      {
        title: '姓名',
        dataIndex: 'fdName',
        render: (value) => value
      },
      /*岗位*/
      {
        title: '岗位',
        dataIndex: 'fdPost',
        render: (value) => value && value.fdName
      },
      /*定级级别*/
      {
        title: '定级级别',
        dataIndex: 'fdConfirmLevel',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '资深'
            },
            {
              value: '2',
              label: '高级'
            },
            {
              value: '3',
              label: '中级'
            },
            {
              value: '4',
              label: '初级'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
      },
      /*状态信息*/
      {
        title: '状态信息',
        dataIndex: 'fdStatusInfo',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '未参与项目'
            },
            {
              value: '2',
              label: '中选待入场'
            },
            {
              value: '3',
              label: '项目中-远程'
            },
            {
              value: '4',
              label: '项目中-驻场'
            },
            {
              value: '5',
              label: '已离场'
            },
            {
              value: '6',
              label: '已离职'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
      },
      /*当前项目*/
      {
        title: '当前项目',
        dataIndex: 'fdProject',
        render: (value) => value
      },
      /*首次入场时间*/
      {
        title: '首次入场时间',
        dataIndex: 'fdFirstEntranceDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*上次调级时间*/
      {
        title: '上次调级时间',
        dataIndex: 'fdLastUpgradeDate',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      /*当前项目性质*/
      {
        title: '当前项目性质',
        dataIndex: 'fdCurrentProjectNature',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '项目外包'
            },
            {
              value: '2',
              label: '厂商驻场实施'
            }
          ]
          const option = options.find((option) => option.value === value)

          if (!option) {
            return value
          }

          return option.label
        }
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
  const { $add: $add } = useAdd('/cmsOutStaffInfo/add')
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
          history.goto(`/cmsOutStaffInfo/view/${record.fdId}`)
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
              <Criteria.Input name="fdPost" title="岗位"></Criteria.Input>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    text: '不限',
                    value: ''
                  },
                  {
                    text: '初级',
                    value: '1'
                  },
                  {
                    text: '中级',
                    value: '2'
                  },
                  {
                    text: '高级',
                    value: '3'
                  },
                  {
                    text: '资深',
                    value: '4'
                  }
                ]}
                name="fdConfirmLevel"
                title="定级级别"
              ></Criteria.Criterion>
              <Criteria.Input name="fdProject" title="当前项目"></Criteria.Input>
              <Criteria.Input name="fdInnerTeam" title="当前所属招证内部团队"></Criteria.Input>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdFirstEntranceDate"
                title="首次入场时间"
              ></Criteria.Calendar>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdLastUpgradeDate"
                title="上次调级时间"
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
                  },
                  {
                    text: 'undefined',
                    value: '5'
                  },
                  {
                    text: 'undefined',
                    value: '6'
                  }
                ]}
                name="fdStatusInfo"
                title="状态信息"
              ></Criteria.Criterion>
            </Criteria>
          </div>
        </div>
        <div className="lui-template-list-toolbar">
          <div className="left">
            <Operation key="operation" onChange={handleSorter}>
              {/* 排序 */}
              <Operation.SortGroup>
                <Operation.Sort key="fdCreateTime" name="fdCreateTime" title="创建时间"></Operation.Sort>
                <Operation.Sort key="fdConfirmLevel" name="fdConfirmLevel" title="定级级别"></Operation.Sort>
                <Operation.Sort
                  key="fdFirstEntranceDate"
                  name="fdFirstEntranceDate"
                  title="首次入场时间"
                ></Operation.Sort>
                <Operation.Sort key="fdLastUpgradeDate" name="fdLastUpgradeDate" title="上次调级时间"></Operation.Sort>
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
