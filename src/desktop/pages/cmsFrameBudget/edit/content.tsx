import React, { createElement as h, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { IContentViewProps } from '@ekp-runtime/render-module'
import Icon from '@lui/icons'
import {  Breadcrumb, Button, Message, Modal,Pagination,Tabs } from '@lui/core'
import { EBtnType } from '@lui/core/es/components/Button'
import Table, { useTable } from '@elem/mk-table'
import XForm from './form'
import api from '@/api/cmsFrameBudget'
import apiAdjust from '@/api/cmsFrameBudgetAdjust'

import './index.scss'
const TabPane = Tabs.TabPane

const Content: React.FC<IContentViewProps> = props => {
  const { data,match, history, routerPrefix,queryChange,query } = props
  const baseCls = 'frameBudget-content'
  const id = match.params['id']
  // 机制组件引用
  const formComponentRef = useRef<any>()
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
  // const handleEditAdjust = useCallback(
  //   (record) => {
  //     history.goto(`/cmsFrameBudgetAdjust/edit/${record.fdId}`)
  //   },
  //   [history]
  // )
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
      // {
      //   title: '操作',
      //   render: (_, record) => (
      //     <Button size='sm' type='primary' onClick={()=>handleEditAdjust(record)}>编辑</Button>
      //   ),
      // }
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

  // 校验
  const _validate = async (isDraft: boolean) => {
    // 表单校验
    if (formComponentRef.current && !isDraft) {
      const formErrors = await formComponentRef.current.validate()
      if (formErrors?.length > 0 && !isDraft) {
        return false
      }
    }
    return true
  }

  // 提交数据封装
  const _formatValue = async () => {
    let values = {
      ...data,
    }
    // 表单机制数据
    if (formComponentRef.current) {
      const formValues = await formComponentRef.current.getValue() || {}
      values = {
        ...values,
        ...formValues
      }
      if(formValues.mechanisms){
        delete values.mechanisms
      }
    }
  
    return values
  }

  // 提交前事件
  const _beforeSave = async (isDraft: boolean) => {
    // 提交前表单预处理
    if (formComponentRef.current) {
      const beforeFormErrors = await formComponentRef.current.beforeSubmit({ isDraft })
      if (beforeFormErrors) {
        return false
      }
    }
   
    return true
  }

  // 提交/保存通用逻辑
  const handleSave = async (isDraft: boolean) => {
    // 校验文档
    if (await _validate(isDraft) === false) {
      return
    }
    // 拼装提交数据
    const values = await _formatValue()
    // 文档提交前事件
    if (await _beforeSave(isDraft) === false) {
      return
    }
    // 编辑提交
    try {
      const checkValue = JSON.parse( JSON.stringify(values))
      delete checkValue.cmsFrameBudgetDetail
      const res = await api.checkUnique(checkValue as any)
      if(res.data.length){
        return Message.error('预算时间不得与上次重复', 1)
      }else{
        let addValues = {}
        if(values.cmsFrameBudgetDetail.length){
          addValues = {
            ...values,
          }
        }else{
          addValues = {
            ...values,
            cmsFrameBudgetDetail:values.cmsFrameBudgetDetail.values
          }
        }
        // 提交
        api.save(addValues as any).then(res => {
          if (res.success) {
            Message.success('保存成功', 1, () => {
              history.goBack()
            })
          } else {
            Message.error('保存失败', 1)
          }
        }).catch(() => {
          Message.error('保存失败', 1)
        })
      }
    } catch (error) {
      Message.error('保存失败', 1)
    }
  }

  // 删除
  const handleDelete = () => {
    Modal.confirm({
      title: '确认删除此记录?',
      icon: h(Icon, { name: 'delete', color: '#F25643' }),
      okType: 'danger' as EBtnType,
      okText: '删除',
      onOk: () => {
        api
          .delete({ fdId: data.fdId })
          .then((res) => {
            if (res.success) {
              Message.success('删除成功')
              history.goto(routerPrefix)
            } else {
              Message.error(res.data.exMsg || '删除失败')
            }
          })
          .catch((error) => {
            const errorMes = error.response.data && error.response.data.data.exMsg
            Message.error(errorMes || '删除失败')
          })
      }
    })
  }

  return (
    <div className={baseCls}>
      <div className='lui-approve-template'>
        {/* 操作区 */}
        <div className='lui-approve-template-header'>
          <Breadcrumb>
            <Breadcrumb.Item>基本信息管理</Breadcrumb.Item>
            <Breadcrumb.Item>框架预算</Breadcrumb.Item>
            <Breadcrumb.Item>编辑</Breadcrumb.Item>
          </Breadcrumb>
          <div className='buttons'>
            <Button type='primary' onClick={() => handleSave(true)}>保存</Button>
            <Button type='default' onClick={handleDelete}>删除</Button>
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
    </div>
  )
}

export default Content