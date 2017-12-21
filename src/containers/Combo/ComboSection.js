import React from 'react'
import PropTypes from 'prop-types'

import { Select } from 'antd'

const ComboSection = (props) => {

  const { typeName, bigCount, smallCount, oddCount, evenCount, currentLocation} = props
  return (
    <div className="combo-section">
      <div className="combo-header">
        <div className="combo-title">{typeName}路珠</div>
        <div className="combo-select">
          <Select defaultValue={currentLocation} style={{ width: 120 }} onChange={props.handleLimitChange}>
            <Option value="100">近100期</Option>
            <Option value="200">近200期</Option>
          </Select>
        </div>
        <div className="combo-count">
          累计：大({bigCount})&nbsp;&nbsp;小({smallCount})
          最新~
        </div>
      </div>
      <div className="combo-result-container">
        <div className="combo-column">
          <div className="combo-result">小</div>
          <div className="combo-result">小</div>
        </div>
        <div className="combo-column">
        <div className="combo-result">大</div>
        <div className="combo-result">大</div>
        <div className="combo-result">大</div>
        <div className="combo-result">大</div>
        </div>
        <div className="combo-column">
        <div className="combo-result">小</div>
        <div className="combo-result">小</div>
        <div className="combo-result">小</div>
        <div className="combo-result">小</div>
        </div>
        <div className="combo-column">大</div>
      </div>
    </div>
  )
}

ComboSection.propTypes = {
  typeName: PropTypes.string.isRequired,
  bigCount: PropTypes.number.isRequired,
  smallCount: PropTypes.number.isRequired,
  oddCount: PropTypes.number.isRequired,
  evenCount: PropTypes.number.isRequired,
  handleLimitChange: PropTypes.func.isRequired,
  
  currentLocation: PropTypes.number.isRequired
}

export default ComboSection