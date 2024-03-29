import React from 'react'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'

import './index.scss'

const TableDatePicker = (props) => {
  return (
    <div className={`form-control ${props.className}`}>
      <label>查询日期：</label>
      <DatePicker
        onChange={props.onChange}
        defaultValue={moment()}
      />
    </div>
  )
}

TableDatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default TableDatePicker