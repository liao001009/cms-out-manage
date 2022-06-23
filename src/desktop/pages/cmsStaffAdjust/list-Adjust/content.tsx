import React, { useCallback, useMemo, useState } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination, Tooltip } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsStaffAdjust'
import AddComponent from '@/manage/pages/cmsStaffAdjustTemplate/baseList'
import { useAdd } from '@/desktop/shared/add-staff'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import ExportModal from '@/desktop/components/export'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize, offset } = data
  const [visible, setVisible] = useState<boolean>(false)
  // 表格列定义
  const columns = useMemo(
    () => [
      /*主题*/
      {
        title: '主题',
        dataIndex: 'fdSubject',
        render: (value) => value
      },
      /*调整意见*/
      {
        title: '调整意见',
        dataIndex: 'fdAdjustReason',
        render: (value) => {
          const options = [
            {
              value: '1',
              label: '更换项目'
            },
            {
              value: '2',
              label: '变更权限'
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
        render: (value) => value.fdName
      },
      /*当前项目负责人*/
      {
        title: '当前项目负责人',
        dataIndex: 'fdProjectPrincipal',
        render: (value) => value && value.fdName
      },
      /*当前内部负责人*/
      {
        title: '当前内部负责人',
        dataIndex: 'fdInnerPrincipal',
        render: (value) => value && value.fdName
      },
      /*创建时间*/
      {
        title: '创建时间',
        dataIndex: 'fdCreateTime',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
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
              value: '12',
              label: '撤回'
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
      },
      /*当前处理环节*/
      {
        title: '当前处理环节',
        dataIndex: 'currentNodeNames',
        render (_, row) {
          const value = row?.mechanisms?.lbpmProcess?.lbpm_current_node?.currentNodeNames || '--'
          return <Tooltip title={value}>{value}</Tooltip>
        },
      },
      /*当前处理人*/
      {
        title: '当前处理人',
        dataIndex: 'currentHandlerNames',
        render (_, row) {
          const value = row?.mechanisms?.lbpmProcess?.lbpm_current_processor?.currentHandlerNames || '--'
          return <Tooltip title={value}>{value}</Tooltip>
        },
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

  /** 操作函数集 */

  //新建
  const { $add: $add, $addClose: $addClose, $addVisible: $addVisible } = useAdd('/cmsStaffAdjust/add/!{selectedRow}')
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
  //导出
  const handleExportData = useCallback(
    (event) => {
      setVisible(true)
      event.stopPropagation()
      // $exportData({
      //   selectedRows: selectedRows,
      // })
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
      let conditions = $reduceCriteria(query, values)
      const newValue = values.find(i => i.name === 'fdProject')
      if (newValue.value.length) {
        conditions = {
          ...conditions,
          'fdProject.fdName': { $contains: newValue.value[0]?.value },
        }
        delete conditions.fdProject
      }
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
          history.goto(`/cmsStaffAdjust/view/${record.fdId}`)
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
            <Criteria key="criteria" expandable={true} onChange={handleCriteriaChange}>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    value: '1',
                    text: '更换项目'
                  },
                  {
                    value: '2',
                    text: '变更权限'
                  }
                ]}
                name="fdAdjustReason"
                title="调整意见"
              ></Criteria.Criterion>
              <Criteria.Input name="fdProject" title="当前项目"></Criteria.Input>
              <Criteria.Org orgType={8} title="当前项目负责人" name="fdProjectPrincipal.fdId"></Criteria.Org>
              <Criteria.Org orgType={8} title="当前内部负责人" name="fdInnerPrincipal.fdId"></Criteria.Org>
              <Criteria.Calendar
                options={Criteria.Calendar.buildOptions()}
                name="fdCreateTime"
                title="创建时间"
              ></Criteria.Calendar>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    value: '00',
                    text: '废弃'
                  },
                  {
                    value: '10',
                    text: '草稿'
                  },
                  {
                    value: '11',
                    text: '驳回'
                  },
                  {
                    value: '12',
                    text: '撤回'
                  },
                  {
                    value: '20',
                    text: '待审'
                  },
                  {
                    value: '21',
                    text: '挂起'
                  },
                  {
                    value: '29',
                    text: '异常'
                  },
                  {
                    value: '30',
                    text: '结束'
                  }
                ]}
                name="fdProcessStatus"
                title="文档状态"
              ></Criteria.Criterion>
              {/* <Criteria.Criterion
                canMulti={false}
                options={[]}
                name="lbpm_current_processor"
                title=""
              ></Criteria.Criterion>
              <Criteria.Criterion canMulti={false} options={[]} name="lbpm_current_node" title=""></Criteria.Criterion> */}
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
                <Button type="primary" onClick={handleAdd}>
                  新建
                </Button>
                <AddComponent visible={$addVisible} callback={$addClose}></AddComponent>
                <Button type="default" onClick={handleDeleteAll}>
                  批量删除
                </Button>
                <Button type="default" onClick={handleExportData} disabled={!selectedRows.length}>
                  导出
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
        {
          // @ts-ignore
          visible ? <ExportModal
            visible={visible}
            setVisible={setVisible}
            totalSize={selectedRows.length}
            fdEntityName={'com.landray.cms.out.manage.core.entity.staff.CmsStaffAdjust'}
            pageNo={offset / pageSize + 1}
            pageSize={pageSize}
            conditions={query}
          /> : null
        }
      </div>
    </React.Fragment>
  )
}

export default Content