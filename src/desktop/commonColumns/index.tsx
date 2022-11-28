import React from 'react'
import Criteria from '@elem/criteria'
import { Tooltip } from '@lui/core'

// 评价
export const evaluateColumns = [
  /*项目名称*/
  {
    title: '项目名称',
    dataIndex: 'fdName',
    width: 150,
    ellipsis: true,
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    )
  },
  /**评语 */
  {
    title: '评语',
    dataIndex: 'fdProjectPrincipalEval',
    render: value => value
  },
  /**是否推荐 */
  {
    title: '是否推荐',
    dataIndex: 'fdIsRecommend',
    render: value => value
  },
  /**评价时间 */
  {
    title: '评价时间',
    dataIndex: 'fdEvaluateTime',
    render: value => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
  },
  /**评价人 */
  {
    title: '评价人',
    dataIndex: 'fdEvaluatePerson',
    render: value => value && value.fdName
  }

]

// 框架信息
export const frameInfoColumns = [
  /*框架名称*/
  {
    title: '框架名称',
    dataIndex: 'fdName',
    render: (value) => value
  },
  /*框架管理员*/
  {
    title: '框架管理员',
    dataIndex: 'fdFrameAdmin',
    render: (value) => value && value.fdName
  },
  /*排序号*/
  {
    title: '排序号',
    dataIndex: 'fdOrder',
    render: (value) => value
  },
  /*是否项目类*/
  {
    title: '是否项目类',
    dataIndex: 'fdIsProject',
    render: (value) => {
      const options = [
        {
          value: '1',
          label: '框架'
        },
        {
          value: '2',
          label: '项目'
        }
      ]
      const option = options.find((option) => option.value === value)

      if (!option) {
        return value
      }

      return option.label
    }
  },
  /*说明*/
  {
    title: '说明',
    dataIndex: 'fdDesc',
    render: (value) => value
  }
]
// 框架预算
export const frameBudgeColumns = [
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
]

// 供应商
export const supplierColumns = [
  /*供应商名称*/
  {
    title: '供应商名称',
    dataIndex: 'fdName',
    render: (value) => value
  },
  /*组织机构代码*/
  {
    title: '组织机构代码',
    dataIndex: 'fdOrgCode',
    render: (value) => value
  },
  /*组织机构代码*/
  {
    title: '所属框架',
    dataIndex: 'fdFrame',
    render: (value) => value && value.length ? value.map(i => i.fdName).join(',') : ''
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
  /*创建时间*/
  {
    title: '创建时间',
    dataIndex: 'fdCreateTime',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
  }
]
// 项目
export const projectColumns = [
  /*项目名称*/
  {
    title: '项目名称',
    dataIndex: 'fdName',
    width: 150,
    ellipsis: true,
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    )
  },
  /*项目编号*/
  {
    title: '项目编号',
    dataIndex: 'fdCode',
    render: (value) => value
  },
  /*项目所属框架*/
  {
    title: '项目所属框架',
    dataIndex: 'fdFrame',
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
  /*所属部门*/
  {
    title: '所属部门',
    dataIndex: 'fdBelongDept',
    render: (value) => value && value.fdName
  },
  /*所属组/团队*/
  {
    title: '所属组/团队',
    dataIndex: 'fdBelongTeam',
    render: (value) => value && value.fdName
  },
  /*项目负责人*/
  {
    title: '项目负责人',
    dataIndex: 'fdProjectPrincipal',
    render: (value) => value && value.fdName
  },
  /*内部责任人*/
  {
    title: '内部责任人',
    dataIndex: 'fdInnerPrincipal',
    render: (value) => value && value.fdName
  },
  /*项目立项时间*/
  {
    title: '项目立项时间',
    dataIndex: 'fdProjectDate',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
  },
  /*预计开始时间*/
  {
    title: '预计开始时间',
    dataIndex: 'fdStartDate',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
  },
  /*预计结束日期*/
  {
    title: '预计结束日期',
    dataIndex: 'fdEndDate',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
  }
]
// 外包人员信息
export const outStaffInfoColumns = [
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
    render: (value) => value && value.fdName
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
    render: (value) => value && value.fdName
  },
  /*首次入场时间*/
  {
    title: '首次入场时间',
    dataIndex: 'fdFirstEntranceDate',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
  },
  /*上次调级时间*/
  {
    title: '上次调级时间',
    dataIndex: 'fdLastUpgradeDate',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD')
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
]
//中选确认
export const selectConfirmColumns = [
  /*项目名称*/
  {
    title: '项目名称',
    dataIndex: 'fdName',
    width: 150,
    ellipsis: true,
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    )
  },
  /*项目编号*/
  {
    title: '项目编号',
    dataIndex: 'fdProjectNum',
    render: (value) => value
  },
  /*中选供应商*/
  {
    title: '中选供应商',
    dataIndex: 'fdSupplier',
    render: (value) => value?.fdName
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
  }
]

// 外包人员信息
export const levelColumns = [
  {
    title: '排序号',
    dataIndex: 'fdOrder',
    render: (value) => value
  },
  /*级别名称*/
  {
    title: '级别名称',
    dataIndex: 'fdLevelName',
    render: (value) => value
  },
  /*框架类型*/
  {
    title: '框架类型',
    dataIndex: 'fdFrame',
    render: (value) => value ? value.fdName : ''
  },
  /*学历与经验要求*/
  {
    title: '学历与经验要求',
    dataIndex: 'fdRemark',
    render: (value) => value
  }
]
export const outStaffInfo = [
  /**姓名 */
  {
    tittle: '姓名',
    dataIndex: 'fdName',
    render: (value) => value
  },
  /**所属框架 */
  {
    title: '所属框架',
    dataIndex: 'fdFrame',
    render: (value) => value && value.fdName
  },
  /** 岗位*/
  {
    title: '岗位',
    dataIndex: 'fdPost',
    render: (value) => value && value.fdName
  },
  /**自评级别 */
  {
    title: '自评级别',
    dataIndex: 'fdSkillLevel',
    render: (value) => value
  },
  /**定级级别 */
  {
    title: '定级级别',
    dataIndex: 'fdConfirmLevel',
    render: (value) => value && value.fdName
  }
]

export const supplierOutStaffInfo = [
  /**姓名 */
  {
    title: '姓名',
    dataIndex: 'fdName',
    render: (value) => value
  },
  /** 岗位*/
  {
    title: '岗位',
    dataIndex: 'fdPost',
    render: (value) => value && value.fdName
  },
  /**定级级别 */
  {
    title: '评审定级级别',
    dataIndex: 'fdConfirmLevel',
    render: (value) => value && value.fdName
  }
]
export const contractList = [
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
    render: (value) => value && value.fdName
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
    title: '合同总金额(万元)',
    dataIndex: 'fdTotalAmount',
    render: (value) => value
  }
]
export const supplierPostPriceList = [
  /*岗位名称*/
  {
    title: '岗位名称',
    dataIndex: 'fdPost',
    render: (value) => value && value.fdName
  },
  /*所属框架*/
  {
    title: '所属框架',
    dataIndex: 'fdFrame',
    render: (value) => value && value.fdName
  },
  /*级别*/
  {
    title: '级别',
    dataIndex: 'fdLevel',
    render: (value) => value && value.fdName
  },
  /*人月单价（元）*/
  {
    title: '人月单价（元）',
    dataIndex: 'fdPrice',
    render: (value) => value
  },
  /*地域*/
  {
    title: '地域',
    dataIndex: 'fdStationAddress',
    render: (value) => value && value.fdName
  }
]
// 岗位
export const postColumns = [
  /*排序号*/
  {
    title: '排序号',
    dataIndex: 'fdOrder',
    render: (value) => value
  },
  /*岗位名称*/
  {
    title: '岗位名称',
    dataIndex: 'fdPostName',
    render: (value) => value
  },
  /*框架类型*/
  {
    title: '框架类型',
    dataIndex: 'fdFrame',
    render: (value) => value.fdName
  },
  /*基本要求*/
  {
    title: '基本要求',
    dataIndex: 'fdBaseRequire',
    render: (value) => value
  }
]

// 表格列定义
export const projectSelectInfocolumns = [
  /*主题*/
  {
    title: '主题',
    dataIndex: 'fdSubject',
    render: (value) => value
  },
  /*项目名称*/
  {
    title: '项目名称',
    dataIndex: 'fdName',
    width: 150,
    ellipsis: true,
    render: (value) => (
      <Tooltip placement="topLeft" title={value}>
        {value}
      </Tooltip>
    )
  },
  /*中选供应商*/
  {
    title: '中选供应商',
    dataIndex: 'fdSelectedSupplier',
    render: (value) => value?.map(item => item.fdName).join(',')
  },
  /*落选供应商*/
  {
    title: '落选供应商',
    dataIndex: 'fdFailSupplier',
    render: (value) => value?.map(item => item.fdName).join(',')
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
  }
]

export const staffReviewColumns = [
  /*主题*/
  {
    title: '主题',
    dataIndex: 'fdSubject',
    render: (value) => value
  },
  /*项目负责人*/
  {
    title: '项目负责人',
    dataIndex: 'fdProjectLeader',
    render: (value) => value && value.fdName
  },
  /*中选供应商*/
  {
    title: '中选供应商',
    dataIndex: 'fdSupplies',
    render: (value) => value && value.map(i => i.fdName).join(',')
  },
  /**文档状态 */
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
]

export const cmsProjectInterviewList = [
  /*实际面试时间*/
  {
    title: '实际面试时间',
    dataIndex: 'fdInterviewTime',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
  },
  /*合格分数线*/
  {
    title: '合格分数线',
    dataIndex: 'fdQualifiedMark',
    render: (value) => value
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
  }
]

export const cmsProjectWrittenList = [
  /*笔试时间*/
  {
    title: '笔试时间',
    dataIndex: 'fdWrittenTime',
    render: (value) => value && mk.getFormatTime(value, 'YYYY-MM-DD HH:mm')
  },
  /*合格分数线*/
  {
    title: '合格分数线',
    dataIndex: 'fdQualifiedMark',
    render: (value) => value
  },
  /*是否面试*/
  {
    title: '是否面试',
    dataIndex: 'fdIsInterview',
    render: (value) => {
      const options = [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
      const option = options.find((option) => option.value === value)

      if (!option) {
        return value
      }

      return option.label
    }
  },
  /*邮件通知供应商*/
  {
    title: '邮件通知供应商',
    dataIndex: 'fdNoticeSupplier',
    render: (value) => {
      const options = [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
      const option = options.find((option) => option.value === value)

      if (!option) {
        return value
      }

      return option.label
    }
  },
  /*邮件通知面试官*/
  {
    title: '邮件通知面试官',
    dataIndex: 'fdNoticeInterviewer',
    render: (value) => {
      const options = [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }
      ]
      const option = options.find((option) => option.value === value)

      if (!option) {
        return value
      }

      return option.label
    }
  }
]
// 考勤数据
export const attendDataColumns = [
  // 主题
  {
    title: '主题',
    dataIndex: 'fdSubject',
    align: 'center',
    render: (value) => value
  },
  // 申请人
  {
    title: '申请人',
    dataIndex: 'fdCreator',
    align: 'center',
    render: (value) => value && value.fdName
  },
  // 申请时间
  {
    title: '申请时间',
    dataIndex: 'fdCreateTime',
    align: 'center',
    render: value => value && mk.getFormatTime(value, 'YYYY-MM-DD')
  }
]

// 供应商筛选
const supplierCriertia = () => {
  return (
    <React.Fragment>
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
      <Criteria.Input name="fdFrame.fdName" title="所属框架"></Criteria.Input>
    </React.Fragment>
  )
}
// 项目表格筛选
const projectCriertia = () => {
  return (
    <React.Fragment>
      <Criteria.Input name="fdCode" title="项目编号"></Criteria.Input>
      <Criteria.Input name="fdFrame.fdName" title="项目所属框架"></Criteria.Input>
      <Criteria.Criterion
        canMulti={false}
        options={[
          {
            text: '不限',
            value: ''
          },
          {
            text: '项目外包',
            value: '1'
          },
          {
            text: '厂商驻场实施 ',
            value: '2'
          }
        ]}
        name="fdProjectNature"
        title="项目性质"
      ></Criteria.Criterion>
      <Criteria.Org orgType={2} title="所属部门" name="fdBelongDept.fdName"></Criteria.Org>
      <Criteria.Org orgType={2} title="所属组/团队" name="fdBelongTeam.fdName"></Criteria.Org>
      <Criteria.Org orgType={8} title="项目负责人" name="fdProjectPrincipal.fdName"></Criteria.Org>
      <Criteria.Org orgType={8} title="内部责任人" name="fdInnerPrincipal.fdName"></Criteria.Org>
      <Criteria.Calendar
        options={Criteria.Calendar.buildOptions()}
        name="fdProjectDate"
        title="项目立项时间"
      ></Criteria.Calendar>
      <Criteria.Calendar
        options={Criteria.Calendar.buildOptions()}
        name="fdStartDate"
        title="预计开始时间"
      ></Criteria.Calendar>
      <Criteria.Calendar
        options={Criteria.Calendar.buildOptions()}
        name="fdEndDate"
        title="预计结束日期"
      ></Criteria.Calendar>
    </React.Fragment>
  )
}

const presonCriertia = () => {
  return (
    <React.Fragment>
      <Criteria.Input name="fdPost.fdName" title="岗位"></Criteria.Input>
      <Criteria.Input name="fdConfirmLevel.fdName" title="定级级别"></Criteria.Input>
      <Criteria.Input name="fdProject.fdName" title="当前项目"></Criteria.Input>
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
            value: '1',
            text: '未参与项目'
          },
          {
            value: '2',
            text: '中选待入场'
          },
          {
            value: '3',
            text: '项目中-远程'
          },
          {
            value: '4',
            text: '项目中-驻场'
          },
          {
            value: '5',
            text: '已离场'
          },
          {
            value: '6',
            text: '已离职'
          }
        ]}
        name="fdStatusInfo"
        title="状态信息"
      ></Criteria.Criterion>
    </React.Fragment>
  )
}
const selectConfirmCriertia = () => {
  return (
    <React.Fragment>
      <Criteria.Input name="fdProject.fdName" title="项目名称"></Criteria.Input>
      <Criteria.Input name="fdProjectNum" title="项目编号"></Criteria.Input>
      <Criteria.Input name="fdSupplier.fdName" title="中选供应商"></Criteria.Input>
      <Criteria.Calendar
        options={Criteria.Calendar.buildOptions()}
        name="fdCreateTime"
        title="创建时间"
      ></Criteria.Calendar>
    </React.Fragment>
  )
}

const postCriteria = () => (
  <React.Fragment>
    <Criteria.Input name="fdFrame.fdName" title="框架类型"></Criteria.Input>
    <Criteria.Input name="fdPostName" title="岗位名称"></Criteria.Input>
  </React.Fragment>
)
const frameInfoCriertia = () => (
  <React.Fragment>
    <Criteria.Input name="fdName" title="框架名称"></Criteria.Input>
    <Criteria.Criterion
      canMulti={false}
      options={[
        {
          text: '不限',
          value: ''
        },
        {
          text: '框架',
          value: '1'
        },
        {
          text: '项目',
          value: '2'
        }
      ]}
      name="fdIsProject"
      title="是否项目类"
    ></Criteria.Criterion>
  </React.Fragment>
)
// 框架预算筛选项
const frameBudgeCriertia = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

const staffReviewUpgrade = () => (
  <React.Fragment>
    <Criteria.Input name="fdName" title="姓名"></Criteria.Input>
    <Criteria.Input name="fdSupplier.fdName" title="供应商名称"></Criteria.Input>
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
  </React.Fragment>
)

const orderResponse = () => (
  <React.Fragment>
    <Criteria.Input name="fdName" title="姓名"></Criteria.Input>
    <Criteria.Input name="fdFrame.fdName" title="所属框架"></Criteria.Input>
    <Criteria.Input name="fdPost.fdName" title="岗位"></Criteria.Input>
    <Criteria.Input name="fdSkillLevel" title="自评级别"></Criteria.Input>
    <Criteria.Input name="fdConfirmLevel.fdName" title="定级级别"></Criteria.Input>
  </React.Fragment>
)

// 供应商筛选
export const demandSupplier = () => {
  return (
    <React.Fragment>
      <Criteria.Input name="fdOrgCode" title="组织机构代码"></Criteria.Input>
      <Criteria.Input name="fdName" title="供应商名称"></Criteria.Input>
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
      <Criteria.Input name="fdFrame.fdName" title="所属框架"></Criteria.Input>
    </React.Fragment>
  )
}
export const projectSelectInfoCriertia = () => {
  return (
    <React.Fragment>
      <Criteria.Org orgType={8} title="创建人" name="fdCreator.fdId"></Criteria.Org>
      <Criteria.Calendar
        options={Criteria.Calendar.buildOptions()}
        name="fdCreateTime"
        title="创建时间"
      ></Criteria.Calendar>
      <Criteria.Input name="fdSubject" title="主题"></Criteria.Input>
      <Criteria.Input name="fdProject" title="项目名称"></Criteria.Input>
      <Criteria.Input name="fdSelectedSupplier" title="中选供应商"></Criteria.Input>
      <Criteria.Input name="fdFailSupplier" title="落选供应商"></Criteria.Input>
    </React.Fragment>
  )
}

export const criertiaObj = {
  supplierCriertia: supplierCriertia(),
  projectCriertia: projectCriertia(),
  presonCriertia: presonCriertia(),
  selectConfirmCriertia: selectConfirmCriertia(),
  postCriteria: postCriteria(),
  frameInfoCriertia: frameInfoCriertia(),
  frameBudgeCriertia: frameBudgeCriertia(),
  staffReviewUpgrade: staffReviewUpgrade(),
  orderResponse: orderResponse()
}














