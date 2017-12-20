import { reduce } from 'rambda'

// 计算总和 数字
export function totalAmount(numberList) {
  const iteratorFn = (acc, val) => parseInt(acc, 10) + parseInt(val, 10)
  return reduce(iteratorFn, 1)(numberList)
}

// 计算总和 字串 总和 字串 ex. 大单
export function totalResult(numberList) {
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
export function calculateByUnit(numberList, index) {
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
export function calculateBSRatio(numberList) {
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
export function calculateOERatio(numberList) {
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
export const calculateDT = () => {
  
}


