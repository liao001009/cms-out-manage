import { Message } from '@lui/core'
import { useCallback } from 'react'
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

export const checkIdNo = useCallback(() => {
  return (_rule, value) => {
    console.log('_rule',_rule)
    console.log('value',value)

    const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    const q = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/
    if (value && value.length===18 && p.test(value)) {
      const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      const parity = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ]
      const code = value.substring(17)
      let sum = 0
      for(let i=0 ;i < 17; i+=1) {
        sum += value[i] * factor[i]
      }
      if(parity[sum % 11] === code.toUpperCase()) {
        return Promise.resolve()
      }
    }
    if (value && value.length===15 && q.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error(`超出${length}个英文字符限制`))
  }
}, [])