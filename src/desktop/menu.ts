// 菜单配置
import api from '@/api/sysAuth'
// import { Module } from '@ekp-infra/common'
const menu = [
  /** 供应商管理*/
  {
    key: '/~~pc2wyyz6le8',
    label: 'cms-out-manage:menu.mpc2wyyz6le8',
    icon: 'add-document',
    module: 'cms-out-supplier',
    order: 1,
    // meta: {
    //   role: ['ROLE_CMSOUTSUPPLIER_DEFAULT']
    // },
    children: [
      { key: '/cmsSupplierInfo/listSupplierInfo', label: 'cms-out-manage:menu.cmsSupplierInfo.listSupplierInfo' },
      // { key: '/cmsContractInfo/listContractInfo', label: ':menu.cmsContractInfo.listContractInfo' },
      // { key: '/cmsSupplierPostPrice/listPostPrice', label: ':menu.cmsSupplierPostPrice.listPostPrice' },
      { key: '/cmsOutStaffInfo/listStaffInfo', label: 'cms-out-manage:menu.cmsOutStaffInfo.listStaffInfo' },
      // { key: '/cmsStaffReviewUpgrade/listStaffReview', label: ':menu.cmsStaffReviewUpgrade.listStaffReview' },
      // { key: '/cmsSupplierEvaluate/listSupplierEvaluate', label: ':menu.cmsSupplierEvaluate.listSupplierEvaluate' },
      // { key: '/cmsSupplierEvalScore/listEvaluateScore', label: ':menu.cmsSupplierEvalScore.listEvaluateScore' }
    ]
  },
  /** 项目管理*/
  {
    key: '/cmsProjectInfo',
    label: 'cms-out-manage:menu.cmsProjectManagement',
    icon: 'add-document',
    order: 2,
    // meta: {
    //   role: ['ROLE_CMSOUTPROJECT_ADMIN']
    // },
    children: [
      { key: '/cmsProjectInfo', label: 'cms-out-manage:menu.mbvr4bpjdbc', icon: 'add-document' },
    ]
  },
  /** 人员管理*/
  {
    key: '/cmsStaffEntrance',
    label: 'cms-out-manage:menu.cmsPersonnelManagement',
    icon: 'add-document',
    order: 3,
    // meta: {
    //   role: ['ROLE_CMSOUTSTAFF_DEFAULT']
    // },
    children: [
      { key: '/cmsStaffEntrance', label: 'cms-out-manage:menu.mjeghuh20rd', icon: 'add-document' },
      { key: '/cmsStaffAdjust', label: 'cms-out-manage:menu.mdip4klbk717', icon: 'add-document' },
      { key: '/cmsStaffLeave', label: 'cms-out-manage:menu.me1g6jcuktze', icon: 'add-document' },
    ]
  },
  /**基本信息管理 */
  {
    key: '/cmsFrameInfo',
    label: 'cms-out-manage:menu.cmsBasicInformation',
    icon: 'add-document',
    order: 4,
    // meta: {
    //   role: ['ROLE_CMSOUTMANAGE_ADMIN']
    // },
    children: [
      { key: '/cmsFrameInfo', label: 'cms-out-manage:menu.cmsFrameInfo', icon: 'add-document' },
      { key: '/cmsFrameBudget', label: 'cms-out-manage:menu.cmsFrameBudget', icon: 'add-document' },
      // { key: '/cmsFrameBudgetAdjust', label: 'cms-out-manage:menu.cmsFrameBudgetAdjust', icon: 'add-document'},
      { key: '/cmsLevelInfo', label: 'cms-out-manage:menu.cmsLevelInfo', icon: 'add-document' },
      { key: '/cmsPostInfo', label: 'cms-out-manage:menu.cmsPostInfo', icon: 'add-document' },
    ]
  },
  /**工单管理 */
  {
    key: '/cmsOutOrder',
    label: 'cms-out-manage:menu.cmsWorkOrder',
    icon: 'add-document',
    order: 5,
    module: 'cms-out-order',
    // meta: {
    //   role: ['ROLE_CMSOUTORDER_DEFAULT']
    // },
    children: [
      {
        key: '/cmsOutOrder',
        label: 'cms-out-manage:menu.cmsWorkOrder',
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
  // // const moduleApi =await Module.getApi('cms-out-order')
  // const orderMenu =await moduleApi.menuApi()
  // console.log('orderMenu',orderMenu)
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


