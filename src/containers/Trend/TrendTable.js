import React from 'react'
import { Table } from 'antd'
import { map, addIndex, range } from 'ramda'

import { BasicTrendColumns, CompositeTrendColumns } from './TrendConfig'

const mapWithIndex = addIndex(map)

const TrendTable = (props) => {

  const { trendList } = props

  const unitList = ['万位', '千位', '百位', '十位', '个位']


  const countAddtionalRow = (data) => { // 出现总次数 最大遗漏值 最大连出值
    const unitNameList = Object.keys(data)
    if (unitNameList.length <= 0) {
      return   
    } 
    
    let obj = {}
    unitList.forEach((unit, unitIndex) => {
      range(0, 10).forEach((index) => {
        Object.assign(obj, {}, {
          [unit + index]: parseInt(data[unitNameList[unitIndex]][index], 10)
        })
      })
    })
    return [
      {
        ...obj,
        columnLength: trendList.trendsList.length
      }
    ]
  }

  let dataSource
  if (props.trendTypeId === 1) {
    dataSource = mapWithIndex((trend) => {
      // 遗漏值
      let MissObj = {}
      unitList.forEach((unit, unitIndex) => {
        range(0, 10).forEach((index) => {
          Object.assign(MissObj, {}, {
            [unit + index]: parseInt(trend.missList[unitIndex][index], 10)
          })
        })
      })

      // 开奖号码
      let openList = trend.openResult.split('')
      let openObj = {}
      openList.forEach((open, openIndex) => {
        Object.assign(openObj, {}, {
          [unitList[openIndex] + open]: unitList[openIndex] + open
        })
      })

      // 中奖号码位数
      const openUnitList = Object.keys(openObj)


      const MissData = props.showMiss ? MissObj : {}
      return {
        columnLength: trendList.trendsList.length,
        openUnitList,
        openResult: trend.openResult,
        ticketPlanId: trend.ticketPlanId,
        ...MissData, // 显示遗漏的时候
        ...openObj,
      }
    })(trendList.trendsList)



    dataSource = dataSource.concat(
      countAddtionalRow(trendList.counStat),
      countAddtionalRow(trendList.counStat), // @TODO 平均遗漏值 待计算
      countAddtionalRow(trendList.missStat),
      countAddtionalRow(trendList.comboStat),
    )

  }
  return (
    <Table
      rowKey="uid"
      bordered
      dataSource={dataSource}
      columns={props.trendTypeId === 1 ? BasicTrendColumns : CompositeTrendColumns}
      rowClassName="table-row"
      pagination={false}
    />
  )
}

export default TrendTable