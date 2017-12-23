import { map, range, addIndex, find } from 'ramda'
import _ from 'lodash'
import React from 'react'

const rowWithNumber = (unit) => map((index) => ({
  title: index,
  dataIndex: unit+index,
  key: unit+index,
  width: 20,
  render: (text, row, index) => {
    let item
    if (index >= row.columnLength) {
      item = text
    } else {
      row.openUnitList.some((openUnit) => {
        if (openUnit === text) {
          if (openUnit.includes('千位') || openUnit.includes('十位')) {
            item = <span className={`trend-red ${openUnit.slice(0, 2)}`}>{text.split('')[text.split('').length - 1]}</span>
          } else {
            item = <span className={`trend-blue ${openUnit.slice(0, 2)}`}>{text.split('')[text.split('').length - 1]}</span>
          }
        } else {
          item = text
        }
        return openUnit === text
      })
    }
    
    return item
  }
}))(range(0, 10))

const unitList = ['万位', '千位', '百位', '十位', '个位']
const unitListRow = map((unit) => ({
  title: unit,
  className: 'table-header-gray',
  children: [
    ...rowWithNumber(unit)
  ]
}))(unitList)

export const BasicTrendColumns = [
  {
    title: '期号',
    className: 'table-header-gray',
    key: 'ticketPlanId',
    dataIndex: 'ticketPlanId',
    render: (text, row, index) => {
      if (index === row.columnLength) {
        return {
          children: '出现总次数',
          props: {
            colSpan: 2,
          }
        }
      } else if (index === row.columnLength + 1) {
        return {
          children: '平均遗漏值',
          props: {
            colSpan: 2,
          }
        }
      } else if (index === row.columnLength + 2) {
        return {
          children: '最大遗漏值',
          props: {
            colSpan: 2,
          }
        }
      } else if (index === row.columnLength + 3) {
        return {
          children: '最大连出值',
          props: {
            colSpan: 2,
          }
        }
      } else {
        return {
          children: text
        }
      }
    }
  },
  {
    title: '开奖号码',
    className: 'table-header-gray',
    key: 'openResult',
    dataIndex: 'openResult',
    render: (text, row, index) => {
      if (index >= row.columnLength) {
        return {
          props: {
            colSpan: 0
          }
        }
      } else {
        return {
          children: text
        }
      }
    }
  },

  ...unitListRow
]

const ratioList = ['5:0', '4:1', '3:2', '2:3', '1:4', '0:5']
const compositeList = ['号码分布', '号码跨度', '大小比', '奇偶比', '质合比', '和值']

const rowWithRatio = map((ratio) => ({
  title: ratio,
  dataIndex: ratio,
  key: ratio
}))(ratioList)

const compositeListRow = map((title) => {
  if (title === '和值') {
    return {
      title,
      className: 'table-header-gray',
      dataIndex: 'sumValue',
      key: 'sumValue',
    }
  } else if (title === '大小比' || title === '奇偶比' || title === '和值') {
    return {
      title,
      className: 'table-header-gray',
      children: [
        ...rowWithRatio
      ]
    }
  } else {
    return {
      title,
      className: 'table-header-gray',
      children: [
        ...rowWithNumber
      ]
    }
  }
})(compositeList)

export const CompositeTrendColumns = [
  {
    title: '期号',
    className: 'table-header-gray',
    key: 'ticketPlanId',
    dataIndex: 'ticketPlanId',
    render: (text, row, index) => {
      if (index < row.length - 4) {
        return { text }
      } else if (index < row.length - 3) {
        return {
          children: '出现总次数',
          props: {
            colSpan: 5
          }
        }
      }
    }
  },
  {
    title: '开奖号码',
    className: 'table-header-gray',
    key: 'openResult',
    dataIndex: 'openResult'
  },

  ...compositeListRow
]