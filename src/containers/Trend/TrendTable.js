import React from 'react'
import { Table } from 'antd'
import { map, addIndex, range, isEmpty } from 'ramda'

import Line from 'components/LineTo'

import { calculateAvgMiss } from 'utils/calculate'

import { BasicTrendColumns, CompositeTrendColumns } from './TrendConfig'

const mapWithIndex = addIndex(map)

const TrendTable = (props) => {

  const { trendList, isFetching } = props

  const dataLength = trendList.trendsList.length

  const unitList = ['万位', '千位', '百位', '十位', '个位']

  const specialList = ['numberDistribution', 'numberSpan', 'sizeRatio', 'oddEvenRatio', 'primeCompositeRatio']

  const specialNameList = ['号码分布', '号码跨度', '大小比', '奇偶比', '质合比']

  const ratioList = ['5:0', '4:1', '3:2', '2:3', '1:4', '0:5']


  const countUnitAdditionalRow = (data, type = { avgMiss: false }) => { // 出现总次数 最大遗漏值 最大连出值
    if (!data || Object.keys(data).length === 0) {
      return
    }

    const unitNameList = Object.keys(data)

    let obj = {}
    unitList.forEach((unit, unitIndex) => {
      range(0, 10).forEach((index) => {
        const number = parseInt(data[unitNameList[unitIndex]][index], 10)
        Object.assign(obj, {}, {
          [unit + index]: type.avgMiss ? calculateAvgMiss(number, dataLength) : number
        })
      })
    })
    return [
      {
        ...obj,
        columnLength: dataLength
      }
    ]
  }

  const countSpecialAdditionalRow = (data, type = { avgMiss: false }) => {
    if (!data || Object.keys(data).length === 0) {
      return
    }

    let obj = {}
    specialNameList.forEach((special, specialIndex) => {
      let key
      switch (special) {
        case '号码分布':
          key = 'numberDistribution'
          break;
        case '号码跨度':
          key = 'numberSpan'
          break;
        case '大小比':
          key = 'sizeRatio'
          break;
        case '奇偶比':
          key = 'oddEvenRatio'
          break;
        case '质合比':
          key = 'primeCompositeRatio'
          break;
        default:
          key = 'primeCompositeRatio'
          break;
      }

      if (special === '号码分布' || special === '号码跨度') {
        range(0, 10).forEach((index) => {
          const number = parseInt(data[key][index], 10)
          Object.assign(obj, {}, {
            [special + index]: type.avgMiss ? calculateAvgMiss(number, dataLength) : number
          })
        })
      } else {
        
        range(0, 7).forEach((index) => {
          const number = parseInt(data[key][ratioList[index]], 10)
          Object.assign(obj, {}, {
            [special + ratioList[index]]: type.avgMiss ? calculateAvgMiss(number, dataLength) : number
          })
        })
      }
    })

    return [
      {
        ...obj,
        columnLength: dataLength
      }
    ]

  }

  let dataSource
  if (props.trendTypeId === 1 && trendList.trendsList[0]) {
    if (trendList.trendsList[0].missList) {
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
          columnLength: dataLength,
          openUnitList,
          redUnitList: [],
          openResult: trend.openResult,
          ticketPlanId: trend.ticketPlanId,
          ...MissData, // 显示遗漏的时候
          ...openObj,
        }
      })(trendList.trendsList)


      if (!isEmpty(trendList.counStat) && !isEmpty(trendList.missStat) && !isEmpty(trendList.comboStat)) {
        dataSource = dataSource.concat(
          countUnitAdditionalRow(trendList.counStat),
          countUnitAdditionalRow(trendList.counStat, { avgMiss: true }),
          countUnitAdditionalRow(trendList.missStat),
          countUnitAdditionalRow(trendList.comboStat),
        )
      }
    }

  } else if (props.trendTypeId === 2 && trendList.trendsList[0]) {
    if (trendList.trendsList[0].missResult) {
      dataSource = mapWithIndex((trend) => {
        // 遗漏值
        let MissObj = {}
        specialList.forEach((special, specialIndex) => {
          const name = specialNameList[specialIndex]
          if (name === '号码分布' || name === '号码跨度') {
            range(0, 10).forEach((index) => {
              Object.assign(MissObj, {}, {
                [specialNameList[specialIndex] + index]: parseInt(trend.missResult[special][index], 10)
              })
            })
          } else if (name === '大小比' || name === '奇偶比' || name === '质合比') {
            range(0, 10).forEach((index) => {
              Object.assign(MissObj, {}, {
                [specialNameList[specialIndex] + ratioList[index]]: parseInt(trend.missResult[special][ratioList[index]], 10)
              })
            })
          } else {
            range(0, 10).forEach((index) => {
              Object.assign(MissObj, {}, {
                [specialNameList[specialIndex] + ratioList[index]]: parseInt(trend.missResult[special][index], 10)
              })
            })
          }

        })

        // 开奖号码
        let result = trend.result
        let numberDistribution = trend.result.numberDistribution // {1: '1', 3: '2', 4: '1'} 如果 key 的值超过2要变成红色 其馀蓝色
        let sumValues = trend.result.sumValues
        // let numberSpan = trend.result.numberSpan // { 4: '4' } 只显示一个 红色
        // let oddEvenRatio = trend.result.oddEvenRatio // { 2:3: '2:3'} 只显示一个 蓝色
        // let sizeRatio = trend.result.sizeRatio // { 2:3: '2:3'} 只显示一个 蓝色
        // let primeCompositeRatio = trend.result.primeCompositeRatio // { 2:3: '2:3'} 只显示一个 蓝色
        let openObj = {}
        let redObj = {}
        let sumObj = {}

        // 号码跨度 大小，奇偶，质合比
        specialNameList.forEach((special, specialIndex) => {
          if (specialIndex === 0) {
            return
          }
          const currentKey = Object.keys(result[specialList[specialIndex]])[0]
          const currentValue = result[specialList[specialIndex]][currentKey]
          Object.assign(openObj, {}, {
            [specialNameList[specialIndex] + currentValue]: specialNameList[specialIndex] + currentValue
          })
        })

        // 号码分布状况不一样 要另外 assign
        const distributionList = Object.keys(numberDistribution)

        distributionList.forEach((distribution, distributionIndex) => {
          if (parseInt(numberDistribution[distribution], 10) >= 2) { // 如果数量大于等于2要是红色
            Object.assign(openObj, {}, {
              [specialNameList[0] + distribution]: 'red' + specialNameList[0] + distribution
            })

            Object.assign(redObj, {}, {
              [specialNameList[0] + distribution]: 'red' + specialNameList[0] + distribution
            })
          } else {
            Object.assign(openObj, {}, {
              [specialNameList[0] + distribution]: specialNameList[0] + distribution
            })
          }

        })

        const sumValuesKey = Object.keys(sumValues)[0]
        const sumValue = sumValues[sumValuesKey]
        Object.assign(sumObj, {}, {
          sumValue: sumValue
        })

        // 中奖号码位数
        const openUnitList = Object.keys(openObj)

        // 要变成红色的位数
        const redUnitList = Object.keys(redObj)


        const MissData = props.showMiss ? MissObj : {}
        return {
          columnLength: dataLength,
          openUnitList,
          redUnitList,

          openResult: trend.openResult,
          ticketPlanId: trend.ticketPlanId,
          ...MissData, // 显示遗漏的时候
          ...openObj,
          ...sumObj,
        }
      })(trendList.trendsList)

      if (!isEmpty(trendList.counStat) && !isEmpty(trendList.missStat) && !isEmpty(trendList.comboStat)) {
        dataSource = dataSource.concat(
          countSpecialAdditionalRow(trendList.counStat),
          countSpecialAdditionalRow(trendList.counStat, {avgMiss: true}),
          countSpecialAdditionalRow(trendList.missStat),
          countSpecialAdditionalRow(trendList.comboStat),
        )
      }
    }
  }
  return (
    <div>
      <Table
      rowKey="uid"
      bordered
      dataSource={dataSource}
      columns={props.trendTypeId === 1 ? BasicTrendColumns : CompositeTrendColumns}
      rowClassName="table-row"
      pagination={false}
      loading={isFetching}
    />
    {
      props.showLine && (
        <div>
          {
            map(unit => {
              if (unit === '万位' || unit === '百位' || unit === '个位' || unit === '奇偶比' || unit === '大小比' || unit === '质合比') {
                return map((index) => 
                  <Line key={index} from={`trend-blue-${unit}-${index}`} to={`trend-blue-${unit}-${index+1}`} color={'#5d95cf'} />
                )(range(0, dataLength))
              } else if ((unit === '千位' || unit === '十位' || unit === '号码跨度')){
                return map((index) => 
                  <Line key={index} from={`trend-red-${unit}-${index}`} to={`trend-red-${unit}-${index+1}`} color={'#d76865'} />
                )(range(0, dataLength))
              }
            }
            )(unitList.concat(specialNameList))
          }
        </div>
      )
    }
    </div>
  )
}


// tr[0] > .trend-red.千位
// tr[1] > .trend-red.千位
// tr[2] > .trend-red.千位
// tr[3] > .trend-red.千位

export default TrendTable