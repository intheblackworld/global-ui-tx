import React from 'react'
import PropTypes from 'prop-types'
import { map, pipe, toString, split, addIndex } from 'rambda'

import './index.scss'

const OnlineNumber = (props) => {
  const { number, type } = props

  let numberList
  if (type === 'red') {
    numberList = number.split(',')
  } else if (type === 'normal') {
    numberList = pipe(
      toString,
      split('')
    )(number)
  }
  const mapWithIndex = addIndex(map)
  return (
    <div>
      {
        <div className={type === 'normal' ? "online-number-normal" : "online-number-red"}>
          {
            numberList && mapWithIndex((number, index) => {
              if (type === 'red') {
                return <div key={index} className="unit">{number}</div>
              }
              if (index === 2 || index === 5) {
                return (
                  <div key={index}>
                    <div className="unit">{number}</div>
                    <div className="dot"></div>
                  </div>
                )
              } else {
                return <div key={index} className="unit">{number}</div>
              }
            })(numberList)
          }
        </div>
      }
    </div>
  )
}

OnlineNumber.propTypes = {
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

export default OnlineNumber