import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { map } from 'rambda'

import './index.scss'

const Option = Select.Option

const TableSelect = (props) => {
  return (
    <div className="form-control right">
      <label>每页显示：</label>
      <Select defaultValue={20} style={{ width: 120 }} onChange={props.onChange}>
        {
          map((option) => <Option key={option.value} value={option.value}>{option.name}</Option>)(props.optionList)
        }
      </Select>
    </div>
  )
}


TableSelect.propTypes = {
  onChange: PropTypes.func,
  optionList: PropTypes.arrayOf(PropTypes.object)
}


export default TableSelect