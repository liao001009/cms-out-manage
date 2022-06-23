import React, { useRef, useCallback, useMemo, useEffect, useState } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import { Breadcrumb, Button, Message, Modal,Tabs,Pagination } from '@lui/core'
import Table, { useTable } from '@elem/mk-table'
import XForm from './form'
import api from '@/api/cmsFrameBudget'
import apiAdjust from '@/api/cmsFrameBudgetAdjust'

import './index.scss'

const { confirm } = Modal
const TabPane = Tabs.TabPane


const Content: React.FC<IContentViewProps> = props => {
  const { data, match,history,queryChange,query } = props
  const id = match.params['id']
  const [adjustArray,setAdjustArray] = useState<any>({})
  useEffect(()=>{
    getAdjustData()
  },[])

  const getAdjustData = async () => {
    try {
      const res = await apiAdjust.listInnerBudgetAdjust({
        conditions:{
          fdBudgetId:id
        }
      })
      setAdjustArray(res.data)
    } catch (error) {
      Message.error(error)
    }
  }

  // 预算调整编辑
  const handleEditAdjust = useCallback(
    (record) => {
      history.goto(`/cmsFrameBudgetAdjust/edit/${record.fdId}?budgetId=${data.fdId}`)
    },
    [history]
  )
  
  // 表格列定义
  const columns = useMemo(
    () => [
      /*所属框架*/
      {
        title: '所属框架',
        dataIndex: 'fdFrame',
        render: (value) => value && value.fdName
      },
      /*预算金额（万元）*/
      {
        title: '预算金额（万元）',
        dataIndex: 'fdBudgetAmount',
        render: (value) => value
      },
      /*调整后金额（万元）*/
      {
        title: '调整后金额（万元）',
        dataIndex: 'fdAfterAdjustAmount',
        render: (value) => value
      },
      /*调整时间*/
      {
        title: '调整时间',
        dataIndex: 'fdAdjustTime',
        render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
      },
      {
        title: '操作',
        render: (_, record) => (
          <Button size='sm' type='primary' onClick={()=>handleEditAdjust(record)}>编辑</Button>
        ),
      }
    ],
    []
  )

  // 表格hook
  const { tableProps } = useTable({
    // 数据源
    data: adjustArray.content || [],
    // 列定义
    columns,
    // 显示序号列
    serial: true,
    // 支持行选择
    rowSelection: false,
  })

  /** 分页操作 */
  const handlePage = useCallback(
    (pageNo: number, pageSize: number) => {
      queryChange({ ...query, pageNo, pageSize })
    },
    [query]
  )

  // 机制组件引用
  const formComponentRef = useRef<any>()
  
  // 关闭
  const handleClose = useCallback(() => {
    history.goBack()
  }, [])


  const handleEdit = useCallback(() => {
    history.goto(`/cmsFrameBudget/edit/${data.fdId}`)
  }, [history])

  const handleDel = useCallback(() => {
    confirm({
      content: '确认删除此记录？',
      onOk () {
        api.delete({ fdId: data.fdId }).then(res => {
          console.log('删除结果', res)
          if (res.success) {
            Message.success('删除成功')
            history.goBack()
          }
        })
      },
      onCancel () {
        console.log('Cancel')
      },
    })
  }, [])

  const handleHref = () =>{
    history.goto(`/cmsFrameBudgetAdjust/add/${data.fdId}`)
  }

  return (
    <div className='lui-approve-template'>
      {/* 操作区 */}
      <div className='lui-approve-template-header'>
        <Breadcrumb>
          <Breadcrumb.Item>基本信息管理</Breadcrumb.Item>
          <Breadcrumb.Item>框架预算</Breadcrumb.Item>
          <Breadcrumb.Item>查看</Breadcrumb.Item>
        </Breadcrumb>
        <div className='buttons'>
          <Button type='primary' onClick={handleHref}>框架预算调整</Button>
          <Button type='default' onClick={handleEdit}>编辑</Button>
          <Button type='default' onClick={handleDel}>删除</Button>
          <Button type='default' onClick={handleClose}>关闭</Button>
        </div>
      </div>
      {/* 内容区 */}
      <div className='lui-approve-template-content'>
        {/* 表单信息 */}
        <div className='form'>
          <XForm formRef={formComponentRef} value={data || {}} />
        </div>
        <div className='tab'>
          <Tabs  defaultActiveKey="1">
            <TabPane tab="调整记录 " key="1">
              <div className="lui-template-list-table">
                <Table {...tableProps} />
              </div>
              <div className="lui-template-list-page">
                {adjustArray.totalSize ? (
                  <Pagination
                    total={adjustArray.totalSize}
                    pageSize={adjustArray.pageSize}
                    onChange={handlePage}
                  />
                ) : null}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Content