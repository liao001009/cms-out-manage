import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination, Tooltip } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsStaffEntrance'
import apiTemplate from '@/api/cmsStaffEntranceTemplate'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import ExportModal from '@/desktop/components/export'
import { Auth } from '@ekp-infra/common'
//@ts-ignore
import Status, { EStatusType } from '@elements/status'
import './index.scss'

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize, offset } = data
  const [visible, setVisible] = useState<boolean>(false)
  const [templateData, setTemplateData] = useState<any>({})
  useEffect(()=>{
    loadTemplateData()
  },[])

  const loadTemplateData = async () =>{
    try {
      const res = await apiTemplate.list({
        sorts: { fdCreateTime: 'desc' },
        columns: ['fdId', 'fdName', 'fdCode', 'fdCreator', 'fdCreateTime'],
        ...query
      })
      setTemplateData(res?.data?.content[0])
    } catch (error) {
      console.error(error)
    }
  }

  // 表格列定义
  const columns = useMemo(
    () => [
      /*主题*/
      {
        title: '主题',
        dataIndex: 'fdSubject',
        render: (value) => value
      },
      /*所属系统/项目*/
      {
        title: '所属系统/项目',
        dataIndex: 'fdProject',
        render: (value) => value && value.fdName
      },
      /*项目性质*/
      {
        title: '项目性质',
        dataIndex: 'fdProjectNature',
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
      },
      /*项目负责人*/
      {
        title: '项目负责人',
        dataIndex: 'fdProjectPrincipal',
        render: (value) => value && value.fdName
      },
      /*内部负责人*/
      {
        title: '内部负责人',
        dataIndex: 'fdInnerPrincipal',
        render: (value) => value && value.fdName
      },
      /*入场供应商*/
      {
        title: '入场供应商',
        dataIndex: 'fdSupplier',
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

  //新建
  const handleAdd = useCallback(
    (event) => {
      event.stopPropagation()
      history.goto(`/cmsStaffEntrance/add/${templateData.fdId}`)
    },
    [history, selectedRows, refresh,templateData]
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
      event.stopPropagation()
      setVisible(true)
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
      let conditionsCompare = {} as any
      if (conditions['fdProject.fdName'] || conditions['fdSupplier.fdSupplierName']) {
        conditionsCompare = {
          ...conditions,
          'fdProject.fdName': conditions['fdProject.fdName'] && { $contains: conditions['fdProject.fdName'].$eq },
          'fdSupplier.fdSupplierName': conditions['fdSupplier.fdSupplierName'] && { $contains: conditions['fdSupplier.fdSupplierName'].$eq },
        }
      } else {
        conditionsCompare = {
          ...conditions
        }
      }
      queryChange &&
        queryChange({
          ...query,
          conditions: conditionsCompare
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
          history.goto(`/cmsStaffEntrance/view/${record.fdId}`)
        }
      }
    },
    [history]
  )

  return (
    <React.Fragment>
      <Auth.Auth
        authURL='/staff/cmsStaffEntrance/listEntrance'
        authModuleName='cms-out-manage'
        unauthorizedPage={
          <Status type={EStatusType._403} title='抱歉，您暂无权限访问当前页面' />
        }
      >
        <div className="lui-template-list">
          <div className="lui-template-list-criteria">
            <div className="left">
              {/* 搜索 */}
              <Input.Search allowClear placeholder="请输入关键词搜索" onSearch={handleSearch} />
            </div>
            <div className="right">
              {/* 筛选器 */}
              <Criteria key="criteria" expandable={true} onChange={handleCriteriaChange}>
                <Criteria.Input name="fdProject.fdName" title="所属系统/项目"></Criteria.Input>
                <Criteria.Criterion
                  canMulti={false}
                  options={[
                    {
                      text: '不限',
                      value: ''
                    },
                    {
                      value: '1',
                      text: '项目外包'
                    },
                    {
                      value: '2',
                      text: '厂商驻场实施'
                    }
                  ]}
                  name="fdProjectNature"
                  title="项目性质"
                ></Criteria.Criterion>
                <Criteria.Org orgType={2} title="所属部门" name="fdBelongDept.fdId"></Criteria.Org>
                <Criteria.Org orgType={2} title="所属组/团队" name="fdBelongTeam.fdId"></Criteria.Org>
                <Criteria.Org orgType={8} title="项目负责人" name="fdProjectPrincipal.fdId"></Criteria.Org>
                <Criteria.Org orgType={8} title="内部负责人" name="fdInnerPrincipal.fdId"></Criteria.Org>
                <Criteria.Input name="fdSupplier.fdSupplierName" title="入场供应商"></Criteria.Input>
                <Criteria.Calendar
                  options={Criteria.Calendar.buildOptions()}
                  name="fdCreateTime"
                  title="创建时间"
                ></Criteria.Calendar>
                <Criteria.Criterion
                  canMulti={false}
                  options={[
                    {
                      text: '不限',
                      value: ''
                    },
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
                  <Button type="primary" onClick={handleAdd}>
                    新建
                  </Button>
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
            visible ? <ExportModal
              visible={visible}
              setVisible={setVisible}
              totalSize={selectedRows.length}
              fdEntityName={'com.landray.cms.out.manage.core.entity.staff.CmsStaffEntrance'}
              pageNo={offset / pageSize + 1}
              pageSize={pageSize}
              conditions={query}
            /> : null
          }
        </div>
      </Auth.Auth>
    </React.Fragment>
  )
}

export default Content
