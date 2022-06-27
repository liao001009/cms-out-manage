import React, { useCallback, useMemo, useState } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import { Input, Button, Space, Pagination, Modal } from '@lui/core'
import Criteria from '@elem/criteria'
import { $reduceCriteria } from '@/desktop/shared/criteria'
import Operation from '@elem/operation'
import Table, { useTable } from '@elem/mk-table'
import api from '@/api/cmsSupplierInfo'
import { useAdd } from '@/desktop/shared/add'
import { $deleteAll } from '@/desktop/shared/deleteAll'
import { Module } from '@ekp-infra/common'
import './index.scss'
import { Auth } from '@ekp-infra/common'
const Import = Module.getComponent('sys-mech-transport', 'Import')

const Content: React.FC<IContentViewProps> = (props) => {
  const { status, data, queryChange, query, refresh, history } = props
  const { content, totalSize, pageSize } = data
  const [importVisible, setImportVisible] = useState<boolean>(false)


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
      /*所属框架*/
      // {
      //   title: '所属框架',
      //   dataIndex: 'fdFrame',
      //   render: (value) => value
      // },
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
  /** 操作函数集 */

  //新建
  const { $add: $add } = useAdd('/cmsSupplierInfo/add')
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
        fdSupplierName: { $contains: keyword.trim() }
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
          history.goto(`/cmsSupplierInfo/view/${record.fdId}`)
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
              {/* <Criteria.Input name="fdSupplierSimpleName" title="供应商简称"></Criteria.Input> */}
              <Criteria.Input name="fdOrgCode" title="组织机构代码"></Criteria.Input>
              <Criteria.Criterion
                canMulti={false}
                options={[
                  {
                    text: '不限',
                    value: ''
                  },
                  {
                    text: '未签合同',
                    value: '1'
                  },
                  {
                    text: '已签合同',
                    value: '2'
                  },
                  {
                    text: '合同过期',
                    value: '3'
                  }
                ]}
                name="fdCooperationStatus"
                title="供应商合作状态"
              ></Criteria.Criterion>
              <Criteria.Input name="fdFrame" title="所属框架"></Criteria.Input>
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
                  authURL='/supplier/cmsSupplierInfo/add'
                  authModuleName='cms-out-manage'
                  unauthorizedPage={null}
                >
                  <Button type="primary" onClick={handleAdd}>
                    新建
                  </Button>
                </Auth.Auth>
                <Button type="default" onClick={() => setImportVisible(true)}>
                  导入
                </Button>
                <Auth.Auth
                  authURL='/supplier/cmsSupplierInfo/delete'
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
      <Modal
        visible={importVisible}
        title={false}
        onCancel={() => setImportVisible(false)}
        modalType='oversized'
        footer={null}
        destroyOnClose={true}
      >
        <Import
          isDefault={false}
          isMasterTemplate={true}
          fdEntityName='com.landray.cms.out.manage.core.entity.supplier.CmsSupplierInfo'
        />
      </Modal>
    </React.Fragment>
  )
}

export default Content
