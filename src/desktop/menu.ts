import apiMenu from '@/api/cmsOutManageCommon'

const getMenu = async () => {
  const res = await apiMenu.getNav()
  const noOrderArr = res.data.filter(i => !i.order)
  const orderArr = res.data.filter(i => i.order)
  orderArr.sort((a, b) => parseInt(a.order) - parseInt(b.order))
  return noOrderArr.concat(orderArr)
}

export default getMenu