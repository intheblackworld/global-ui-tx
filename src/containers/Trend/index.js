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
    trendList: state.trendList
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
    const { trendList } = this.props
    const { currentFilterValue, currentTrendTypeId, trendTypeId } = this.state
    return (
      <div className="trend">
        <TrendControl
          currentFilterValue={currentFilterValue}
          handleTrendTypeChange={this.handleTrendTypeChange}
          handleEffect={this.handleEffect}
          currentTrendTypeId={currentTrendTypeId}
          handleFilterChange={this.handleFilterChange}
        />
        <TrendTable
          trendList={this.props.trendList}
          trendTypeId={trendTypeId}
          showLine={this.state.showLine}
          showMiss={this.state.showMiss}
        />
      </div>
    )
  }
}


export default Trend