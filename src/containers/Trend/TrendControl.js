import React from 'react'
import PropTypes from 'prop-types'
import { map, range } from 'ramda'
import { Button } from 'antd'


const TrendControl = (props) => {

  const trendNameList = ['基本五星走势', '五星综合走势']

  const buttonList = map((index) => <Button
    key={index}
    type={props.currentTrendTypeId === index ? 'primary' : ''}
    onClick={props.handleTrendTypeChange}
    data-trendid={index}
  >{trendNameList[index - 1]}</Button>
  )(range(1, 3))

  const checkboxList = map
  return (
    <div>
      {buttonList}
    </div>
  )
}

TrendControl.propTypes = {
  currentTrendTypeId: PropTypes.number,
  handleTrendTypeChange: PropTypes.func
}

export default TrendControl