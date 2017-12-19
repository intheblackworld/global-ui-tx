import React from 'react'
import PropTypes from 'prop-types'
import { map, pipe, toString, split, addIndex } from 'rambda'

import './index.scss'

const OnlineNumber = (props) => {
  const { number } = props

  const numberList = pipe(
    toString,
    split('')
  )(number)
  const mapWithIndex = addIndex(map)
  return (
    <div className="online-number-container">
      {
        mapWithIndex((number, index) => {
          if (index === 2 || index === 5) {
            return (
              <div>
                <div className="unit">{number}</div>
                <div className="dot"></div>
              </div>
            )
          } else {
            return <div className="unit">{number}</div>
          }
        })(numberList)
      }
    </div>
  )
}

OnlineNumber.propTypes = {
  number: PropTypes.number.isRequired
}

export default OnlineNumber