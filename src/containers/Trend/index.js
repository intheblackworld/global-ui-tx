import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { map, addIndex, find, contains } from 'ramda'

import { fetchTrendList } from 'actions'

import TrendControl from './TrendControl'
import TrendTable from './TrendTable'

import './index.scss'

@connect(
  (state) => ({
    trendList: state.trendList,
    isFetching: state.isFetching.isFetching
  }),
  dispatch => ({
    fetchTrendList: (data) => dispatch(fetchTrendList(data))
  })
)
class Trend extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // 控件状态
      currentTrendTypeId: 1, // 1:基本 2:综合
      currentFilterValue: 30,

      limit: 30,
      days: '',
      trendTypeId: 1,
      showLine: false,
      showMiss: false
    }

    this.handleTrendTypeChange = this.handleTrendTypeChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleEffect = this.handleEffect.bind(this)
  }

  static propTypes = {
    ticketId: PropTypes.number.isRequired,
  }

  handleTrendTypeChange(e) {
    const target = e.currentTarget
    const trendTypeId = parseInt(target.dataset.trendid, 10)
    const { limit, days } = this.state
    const { ticketId, currentTrendTypeId } = this.props

    this.props.fetchTrendList({
      trendTypeId, // 1:基本 2:综合
      limit,
      ticketId,
      days,
    })
    
    this.setState({
      trendTypeId,
      currentFilterValue: 30,
      showLine: false,
      showMiss: false,

      currentTrendTypeId: trendTypeId
    })
  }

  handleEffect(checkedValues) {
    this.setState({
      showLine: contains('line')(checkedValues) ? true : false,
      showMiss: contains('miss')(checkedValues) ? true : false,
    })
  }

  handleFilterChange(e) {
    const target = e.currentTarget
    const value = parseInt(target.dataset.key, 10)
    if (value <= 2) { // 代表是今日或者近两天
      this.props.fetchTrendList({
        ticketId: this.props.ticketId,
        
        trendTypeId: this.state.trendTypeId,
        limit: '',
        days: value,
      })
    } else { // 代表是近30,50,100期
      this.props.fetchTrendList({
        ticketId: this.props.ticketId,

        trendTypeId: this.state.trendTypeId,
        limit: value,
        days: '',
      })
    }

    this.setState({
      currentFilterValue: value,
    })
  }

  componentDidMount() {
    this.props.fetchTrendList({
      ticketId: this.props.ticketId,
      limit: 30,
      days: '',
      trendTypeId: 1,
    })
  }

  render() {
    const { trendList, isFetching } = this.props
    const { currentFilterValue, currentTrendTypeId, trendTypeId, showLine, showMiss } = this.state
    return (
      <div className="trend">
        <TrendControl
          currentFilterValue={currentFilterValue}
          handleTrendTypeChange={this.handleTrendTypeChange}
          handleEffect={this.handleEffect}
          currentTrendTypeId={currentTrendTypeId}
          handleFilterChange={this.handleFilterChange}
          showLine={showLine}
          showMiss={showMiss}
        />
        <TrendTable
          trendList={this.props.trendList}
          trendTypeId={trendTypeId}
          showLine={showLine}
          showMiss={showMiss}
          isFetching={isFetching}
        />
        <div className="trend-desc">
          <p><span>出现总次数：</span>指在选定的期数范围内开出号码的总次数</p>
          <p><span>平均遗漏值：</span>指在选定的期数范围内的平均遗漏值，计算公式为：（开奖总期数-中奖次数）÷ 中奖次数 = 平均遗漏值，例如：号码01在100期的中奖次数为63，需计算平均遗漏值，则计算公式为(100-63) ÷ 63 = 0.58，向上取整数，那么号码01在100期的平均遗漏值为1。</p>
          <p><span>最大遗漏值：</span>指在选定的期数范围内未开出号码的最长间隔期数，例如：万位03在100期有63期未开出，则万位03在100期中的最大遗漏值为63。</p>
          <p><span>最大连出值：</span>指在选定的期数范围内连续开出的号码次数最大的值，例如：万位号码03在20170626-051期出现过，在下一次的20170626-052也出现了，那么万位上的最大连出值则是2。</p>
        </div>
      </div>
    )
  }
}


export default Trend