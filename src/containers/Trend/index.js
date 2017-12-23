import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { map, addIndex, find } from 'ramda'

import { fetchTrendList } from 'actions'

import TrendControl from './TrendControl'
import TrendFilter from './TrendFilter'
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
      currentLimit: 30,
      currentDays: '',

      limit: 30,
      days: '',
      trendTypeId: 1,
    }

    this.handleTrendTypeChange = this.handleTrendTypeChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  static propTypes = {
    ticketId: PropTypes.number.isRequired,
  }

  handleTrendTypeChange(e) {
    const target = e.currentTarget
    const trendTypeId = target.dataset.trendid
    const { limit, days } = this.state
    const { ticketId } = this.props
    this.props.fetchTrendList({
      trendTypeId, // 1:基本 2:综合
      limit,
      ticketId,
      days,
    })
    this.setState({
      trendTypeId
    })
  }

  handleFilterChange() {
    this.props.fetchTrendList({

    })

    this.setState({
      
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
    return (
      <div className="trend">
        <TrendControl 
          handleTrendTypeChange={this.handleTrendTypeChange}
          currentTrendTypeId={this.state.currentTrendTypeId}
        />
        <TrendFilter />
        <TrendTable trendTypeId={this.state.trendTypeId} />
      </div>
    )
  }
}


export default Trend