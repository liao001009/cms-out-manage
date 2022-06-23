import { Message } from '@lui/core'
// 通过身份证获取性别和日期
export const handleIdCard = (v) =>{
  const targetValue = v
  const reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
  const arrSplit = targetValue.match(reg)  //检查生日日期是否正确，value就是身份证号
  if (!arrSplit) {
    Message.error('身份证号格式有问题，请重新输入')
    return
  }
  let sexVal = ''
  if (parseInt(targetValue.slice(-2, -1)) % 2 === 1) {
    sexVal = 'M'
  } else {
  // 女性
    sexVal = 'F'
  }
  return sexVal
}