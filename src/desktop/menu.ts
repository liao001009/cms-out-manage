// 菜单配置
import api from '@/api/sysAuth'
const menu = [
  /** 供应商管理*/
  {
    key: '/~~pc2wyyz6le8',
    label: ':menu.mpc2wyyz6le8',
    icon: 'add-document',
    order: 1,
    // meta: {
    //   role: ['ROLE_CMSOUTSUPPLIER_DEFAULT']
    // },
    children: [
      { key: '/cmsSupplierInfo/listSupplierInfo', label: ':menu.cmsSupplierInfo.listSupplierInfo' },
      // { key: '/cmsContractInfo/listContractInfo', label: ':menu.cmsContractInfo.listContractInfo' },
      // { key: '/cmsSupplierPostPrice/listPostPrice', label: ':menu.cmsSupplierPostPrice.listPostPrice' },
      { key: '/cmsOutStaffInfo/listStaffInfo', label: ':menu.cmsOutStaffInfo.listStaffInfo' },
      // { key: '/cmsStaffReviewUpgrade/listStaffReview', label: ':menu.cmsStaffReviewUpgrade.listStaffReview' },
      // { key: '/cmsSupplierEvaluate/listSupplierEvaluate', label: ':menu.cmsSupplierEvaluate.listSupplierEvaluate' },
      // { key: '/cmsSupplierEvalScore/listEvaluateScore', label: ':menu.cmsSupplierEvalScore.listEvaluateScore' }
    ]
  },
  /** 项目管理*/
  {
    key: '/cmsProjectInfo',
    label: ':menu.cmsProjectManagement',
    icon: 'add-document',
    order: 2,
    // meta: {
    //   role: ['ROLE_CMSOUTPROJECT_ADMIN']
    // },
    children: [
      { key: '/cmsProjectInfo', label: ':menu.mbvr4bpjdbc', icon: 'add-document' },
    ]
  },
  /** 人员管理*/
  {
    key: '/cmsStaffEntrance',
    label: ':menu.cmsPersonnelManagement',
    icon: 'add-document',
    order: 3,
    // meta: {
    //   role: ['ROLE_CMSOUTSTAFF_DEFAULT']
    // },
    children: [
      { key: '/cmsStaffEntrance', label: ':menu.mjeghuh20rd', icon: 'add-document' },
      { key: '/cmsStaffAdjust', label: ':menu.mdip4klbk717', icon: 'add-document' },
      { key: '/cmsStaffLeave', label: ':menu.me1g6jcuktze', icon: 'add-document' },
    ]
  },
  /**基本信息管理 */
  {
    key: '/cmsFrameInfo',
    label: ':menu.cmsBasicInformation',
    icon: 'add-document',
    order: 4,
    // meta: {
    //   role: ['ROLE_CMSOUTMANAGE_ADMIN']
    // },
    children: [
      { key: '/cmsFrameInfo', label: ':menu.cmsFrameInfo', icon: 'add-document' },
      { key: '/cmsFrameBudget', label: ':menu.cmsFrameBudget', icon: 'add-document' },
      // { key: '/cmsFrameBudgetAdjust', label: ':menu.cmsFrameBudgetAdjust', icon: 'add-document'},
      { key: '/cmsLevelInfo', label: ':menu.cmsLevelInfo', icon: 'add-document' },
      { key: '/cmsPostInfo', label: ':menu.cmsPostInfo', icon: 'add-document' },
    ]
  },
  /**工单管理 */
  {
    key: '/cmsOutOrder',
    label: ':menu.cmsWorkOrder',
    icon: 'add-document',
    order: 5,
    // meta: {
    //   role: ['ROLE_CMSOUTORDER_DEFAULT']
    // },
    children: [
      {
        key: '/cmsOutOrder',
        label: ':menu.cmsOutOrder',
        icon: 'add-document',
      }
    ]
  }
]
const createMenu = async () => {
  const params = [
    {
      status: 'checking',
      key: 'auth0',
      role: 'ROLE_CMSOUTSUPPLIER_DEFAULT'
    },
    {
      status: 'checking',
      key: 'auth1',
      role: 'ROLE_CMSOUTPROJECT_ADMIN'
    },
    {
      status: 'checking',
      key: 'auth2',
      role: 'ROLE_CMSOUTSTAFF_DEFAULT'
    },
    {
      status: 'checking',
      key: 'auth3',
      role: 'ROLE_CMSOUTBASEDATA_ADMIN'
    },
    {
      status: 'checking',
      key: 'auth4',
      role: 'ROLE_CMSOUTORDER_DEFAULT'
    }
  ]
  const menuArr: any = []
  const res = await api.roleCheck([...params])
  Object.keys(res.data).forEach(i => {
    if (res.data[i]) {
      const num = i.split('h')[1]
      menuArr.push(menu[num])
    }
  })
  return menuArr
}
export default createMenu


