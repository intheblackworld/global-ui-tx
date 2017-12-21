import React, { Component } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import { toDate } from 'utils/moment'

const ButtonGroup = Button.Group


class TableFilterGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hundredActive: true,
      todayActive: false,
    }

    this.handlehundredButtonClick = this.handlehundredButtonClick.bind(this)
    this.handleTodayButtonsClick = this.handleTodayButtonsClick.bind(this)
  }

  handlehundredButtonClick() {
    this.setState({
      hundredActive: true,
      todayActive: false
    })
    this.props.onClick({
      day: '',
      pageSize: 100,
      pageIndex: 0
    })
  }

  handleTodayButtonsClick() {
    this.setState({
      hundredActive: false,
      todayActive: true
    })
    this.props.onClick({
      day: toDate(moment()),
      pageSize: 1440,
      pageIndex: 0
    })
  }
  
  render() {
    return (
      < ButtonGroup className="filter-group">
        <Button onClick={this.handlehundredButtonClick} className={this.state.hundredActive ? 'active' : ''}>近100期</Button>
        <Button onClick={this.handleTodayButtonsClick} className={this.state.todayActive ? 'active' : ''}>今天</Button>
      </ButtonGroup >
    )
  }
}


export default TableFilterGroup