// 菜单配置
export default [
  {
    key: '/cmsStaffLeaveTemplate',
    label: 'cms-out-manage:menu.mpc2wyyz6le8',
    icon: 'desktop',
    children: [
      {
        key: '/cmsStaffReviewUpgradeTemplate',
        label: 'cms-out-manage:menu.cmsStaffReviewUpgradeTemplate',
        icon: 'desktop',
        module: 'cms-out-supplier'
      }
    ]
  },
  {
    key: '/cmsStaffEntranceTemplate',
    label: 'cms-out-manage:menu.cmsPersonnelManagement',
    icon: 'desktop',
    children: [
      {
        key: '/cmsStaffLeaveTemplate',
        label: 'cms-out-manage:menu.cmsStaffLeaveTemplate',
        module: 'cms-out-staff',
        icon: 'desktop'
      },
      {
        key: '/cmsStaffAttConfigTemplate',
        label: 'cms-out-manage:menu.cmsStaffAttConfigTemplate',
        module: 'cms-out-staff',
        icon: 'desktop'
      },
      {
        key: '/cmsStaffEntranceTemplate',
        label: 'cms-out-manage:menu.cmsStaffEntranceTemplate',
        module: 'cms-out-staff',
        icon: 'desktop'
      },
      {
        key: '/cmsStaffAdjustTemplate',
        label: 'cms-out-manage:menu.cmsStaffAdjustTemplate',
        module: 'cms-out-staff',
        icon: 'desktop'
      },
    ]
  },

  {
    key: '/cmsOutConfig',
    label: 'cms-out-manage:menu.cmsWorkOrder',
    icon: 'desktop',
    children: [
      {
        key: '/cmsOutConfig',
        label: 'cms-out-manage:menu.cmsOutConfig',
        icon: 'desktop',
        module: 'cms-out-order'
      }
    ]
  }
]
