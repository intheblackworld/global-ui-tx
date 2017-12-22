import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { map, range, addIndex } from 'ramda'

import { Select } from 'antd'
const Option = Select.Option

class ComboSection extends Component {

  componentDidMount() {
    document.querySelectorAll('.combo-result-container').forEach(function(element) {
      element.scrollTo(99999, 0)
    })
  }

  componentDidUpdate() {
    document.querySelectorAll('.combo-result-container').forEach(function(element) {
      element.scrollTo(99999, 0)
    })
  }

  render() {
    const { typeName, bigCount, smallCount, oddCount, evenCount, lCount, hCount, currentLimit, ...rest } = this.props

    const { comboList } = rest

    const mapWithIndex = addIndex(map)

    return (
      <div className="combo-section" >
        <div className="combo-header">
          <div className="combo-title">{typeName}路珠</div>
          <div className="combo-select">
            <Select
              defaultValue={currentLimit}
              value={currentLimit}
              style={{ width: 100 }}
              onChange={this.props.handleLimitChange}
              dropdownClassName="combo-limit-select"
            >
              <Option value={100}>近100期</Option>
              <Option value={200}>近200期</Option>
            </Select>
          </div>
          <div className="combo-title-right">最新↓</div>
          <div className="combo-count">
            {
              typeName === '大小' && <span>累计：大({bigCount})&nbsp;&nbsp;小({smallCount})</span>
            }
            {
              typeName === '单双' && <span>累计：单({oddCount})&nbsp;&nbsp;双({evenCount})</span>
            }
            {
              typeName === '龙虎' && <span>累计：龙({lCount})&nbsp;&nbsp;虎({hCount})</span>
            }

          </div>

        </div>
        <div className="combo-result-container">
          <div>
            {
              mapWithIndex((comboObj, index) => {
                const length = comboObj.combo
                const result = comboObj.result

                const resultInColumn = map((index) => {
                  switch (result) {
                    case '大':
                    case '双':
                    case '龙':
                      return <div key={index} className="combo-result blue">{result}</div>
                      break

                    case '小':
                    case '单':
                    case '虎':
                      return <div key={index} className="combo-result gray">{result}</div>
                      break

                    case '和':
                      return <div key={index} className="combo-result red">{result}</div>
                      break
                    default:
                      return <div key={index} className="combo-result blue">{result}</div>
                      break
                      break
                  }
                })(range(0, length))

                return (
                  <div key={index} className="combo-column">
                    {resultInColumn}
                  </div>
                )
              }
              )(comboList)
            }
          </div>
        </div>
      </div>
    )
  }
}

ComboSection.propTypes = {
  typeName: PropTypes.string,
  bigCount: PropTypes.number,
  smallCount: PropTypes.number,
  oddCount: PropTypes.number,
  evenCount: PropTypes.number,
  handleLimitChange: PropTypes.func,

  currentLimit: PropTypes.number
}

export default ComboSection