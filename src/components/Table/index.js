import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd'
import './index.scss'


class Table extends Component {


  handleDateChange(e) {
    console.log(e.currentTarget.value())
  }

  render() {
    return (
      <div className="table-container">
        <div className="form-control">
          <label>查询日期：</label>
          <DatePicker
            onChane={this.handleDateChange}
            placeholder=''
          />
        </div>
        <div className="form-control">
          
        </div>
      </div>
    )
  }
}

export default Table