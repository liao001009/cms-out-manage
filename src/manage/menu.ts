// 菜单配置
export default [
  {
    key: '/cmsStaffLeaveTemplate',
    label: 'cms-out-manage:menu.mpc2wyyz6le8',
    icon: 'desktop',
    meta: {
      role: ['ROLE_CMSOUTMANAGE_SETTING']
    },
    children: [
      {
        key: '/cmsStaffReviewUpgradeTemplate',
        label: 'cms-out-manage:menu.cmsStaffReviewUpgradeTemplate',
        module: 'cms-out-supplier'
      },
      {
        key: '/cmsSelectConfirmTemplate',
        label: 'cms-out-manage:menu.cmsSelectConfirmTemplate',
        module: 'cms-out-supplier'
      },
      {
        key: '/cmsFailNoticeTemplate',
        label: 'cms-out-manage:menu.cmsFailNoticeTemplate',
        module: 'cms-out-supplier'
      },
      {
        key: '/cmsQuitRegisterTemplate',
        label: 'cms-out-manage:menu.cmsQuitRegisterTemplate',
        module: 'cms-out-supplier'
      }
    ]
  },
  {
    key: '/cmsStaffEntranceTemplate',
    label: 'cms-out-manage:menu.cmsPersonnelManagement',
    icon: 'desktop',
    meta: {
      role: ['ROLE_CMSOUTMANAGE_SETTING']
    },
    children: [
      {
        key: '/cmsStaffAttConfigTemplate',
        label: 'cms-out-manage:menu.cmsStaffAttConfigTemplate',
        module: 'cms-out-staff',
      },
      {
        key: '/cmsStaffEntranceTemplate',
        label: 'cms-out-manage:menu.cmsStaffEntranceTemplate',
        module: 'cms-out-staff',
      },
      {
        key: '/cmsStaffAdjustTemplate',
        label: 'cms-out-manage:menu.cmsStaffAdjustTemplate',
        module: 'cms-out-staff',
      },
      {
        key: '/cmsStaffLeaveTemplate',
        label: 'cms-out-manage:menu.cmsStaffLeaveTemplate',
        module: 'cms-out-staff',
      },
      {
        key: '/cmsOverWorkTemplate',
        label: 'cms-out-manage:menu.cmsOverWorkTemplate',
        module: 'cms-out-staff',
      },
      {
        key: '/cmsLeaveApplyTemplate',
        label: 'cms-out-manage:menu.cmsLeaveApplyTemplate',
        module: 'cms-out-staff',
      },
    ]
  },
  // {
  //   key: '/cmsOutConfig',
  //   label: 'cms-out-manage:menu.cmsWorkOrder',
  //   icon: 'desktop',
  //   children: [
  //     {
  //       key: '/cmsOutConfig',
  //       label: 'cms-out-manage:menu.cmsOutConfig',
  //       module: 'cms-out-order'
  //     }
  //   ]
  // },
  {
    key: '/cmsProjectDemandTemplate',
    label: 'cms-out-manage:menu.cmsSupplierService',
    icon: 'desktop',
    meta: {
      role: ['ROLE_CMSOUTMANAGE_SETTING']
    },
    children: [
      {
        key: '/cmsProjectDemandTemplate',
        label: 'cms-out-manage:menu.cmsProjectDemandTemplate',
        module: 'cms-out-project'
      },
      {
        key: '/cmsStaffReviewTemplate',
        label: 'cms-out-manage:menu.cmsStaffReviewTemplate',
        module: 'cms-out-project'
      },
      {
        key: '/cmsProjectSelectInfoTemplate',
        label: 'cms-out-manage:menu.cmsProjectSelectInfoTemplate',
        module: 'cms-out-project'
      }
    ]
  },
  {
    key: '/cmsOutConfig',
    label: 'cms-out-manage:menu.systemMenu',
    icon: 'desktop',
    meta: {
      role: ['ROLE_CMSOUTMANAGE_SETTING']
    },
    children: [
      {
        key: '/cmsOutConfig',
        label: 'cms-out-manage:menu.systemMenu',
        module: 'cms-out-manage'
      },
      {
        key: '/cmsOutEnum',
        label: 'cms-out-manage:menu.cmsOutEnum',
        module: 'cms-out-basedata'
      }
    ]
  },

]
