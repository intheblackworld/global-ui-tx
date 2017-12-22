import { reduce } from 'ramda'
import _ from 'lodash'

// 计算总和 数字
export const totalAmount = (numberList) => {
  const iteratorFn = (acc, val) => parseInt(acc, 10) + parseInt(val, 10)
  return reduce(iteratorFn, 0)(numberList)
}

// 计算总和 字串 总和 字串 ex. 大单
export const totalResult = (numberList) => {
  let firstChar
  let secondChar
  const total = totalAmount(numberList)
  if (total > (numberList.length * 9 / 2)) {
    firstChar = '大'
  } else {
    firstChar = '小'
  }

  if (total % 2 === 0) {
    secondChar = '双'
  } else {
    secondChar = '单'
  }
  return `${firstChar}${secondChar}`
}

// 计算 各位数结果 ex.大单
export const calculateByUnit = (numberList, index) => {
  const currentNumber = parseInt(numberList[index], 10)

  let firstChar
  let secondChar
  if (currentNumber >= 5) {
    firstChar = '大'
  } else {
    firstChar = '小'
  }

  if (currentNumber % 2 === 0) {
    secondChar = '双'
  } else {
    secondChar = '单'
  }
  return `${firstChar}${secondChar}`
}

// 计算 大小比 大小比 ex.3:2
export const calculateBSRatio = (numberList) => {
  let smallArray = []
  let bigArray = []
  numberList.forEach((number) => {
    if (number >= 5) {
      bigArray.push(1)
    } else {
      smallArray.push(1)
    }
  })
  return `${bigArray.length}:${smallArray.length}`
}

// 计算 单双比 单双比 ex.3:2
export const calculateOERatio = (numberList) => {
  let oddArray = []
  let evenArray = []
  numberList.forEach((number) => {
    if (number % 2 === 0) {
      evenArray.push(1)
    } else {
      oddArray.push(1)
    }
  })
  return `${oddArray.length}:${evenArray.length}`
}

// 计算 龙虎 ex.龙, 虎
export const calculateDT = (numberList) => {
  let tenThousandNumber = numberList[0]
  let bit = numberList[4]

  if (tenThousandNumber > bit) {
    return '龙'
  } else if (tenThousandNumber < bit) {
    return '虎'
  } else {
    return '和'
  }
}

// 计算 形态 ex. 组三, 组六, 豹子
export const calculateGroup = (numberList) => {
  let counts = {}
  numberList.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  })
  
  if ((_.invert(counts))[3]) {
    return '豹子'
  } else if ((_.invert(counts))[2]) {
    return '组六'
  } else {
    return '组三'
  }
}

// 为数量加上逗号
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


