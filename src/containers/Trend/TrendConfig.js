import { map, range, addIndex } from 'ramda'

const rowWithNumber = map((index) => ({
  title: index,
  dataIndex: index,
  key: index,
  width: 20,
}))(range(0, 10))

const unitList = ['万位', '千位', '百位', '十位', '个位']
const unitListRow = map((unit) => ({
  title: unit,
  className: 'table-header-gray',
  children: [
    ...rowWithNumber
  ]
}))(unitList)

export const BasicTrendColumns = [
  {
    title: '期号',
    className: 'table-header-gray',
    key: 'planId',
    dataIndex: 'planId',
    render: (text, row, index) => {
      if (index < row.length - 4) {
        return { text }
      } else if (index < row.length - 3) {
        return {
          children: '出现总次数',
          props: {
            colspan: 5
          }
        }
      }
    }
  },
  {
    title: '开奖号码',
    className: 'table-header-gray',
    key: 'number',
    dataIndex: 'number'
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
    key: 'planId',
    dataIndex: 'planId',
    render: (text, row, index) => {
      if (index < row.length - 4) {
        return { text }
      } else if (index < row.length - 3) {
        return {
          children: '出现总次数',
          props: {
            colspan: 5
          }
        }
      }
    }
  },
  {
    title: '开奖号码',
    className: 'table-header-gray',
    key: 'number',
    dataIndex: 'number'
  },

  ...compositeListRow
]