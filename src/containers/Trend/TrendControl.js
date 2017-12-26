import React from 'react'
import PropTypes from 'prop-types'
import { map, range, addIndex } from 'ramda'
import { Button, Checkbox } from 'antd'
const CheckboxGroup = Checkbox.Group

const mapWithIndex = addIndex(map)


const TrendControl = (props) => {

  const trendNameList = ['基本五星走势', '五星综合走势']

  const typeControlList = map((index) => <Button
    key={index}
    type={props.currentTrendTypeId === index ? 'primary' : ''}
    onClick={props.handleTrendTypeChange}
    data-trendid={index}
  >{trendNameList[index - 1]}</Button>
  )(range(1, 3))

  const effectOptions = [
    { label: '辅助线', value: 'line'},
    { label: '遗漏值', value: 'miss'}
  ]

  const filterList = [
    {
      key: 'limit',
      value: 30,
      name: '近30期'
    },
    // {
    //   key: 'limit',
    //   value: 50,
    //   name: '近50期'
    // },
    //  {
    //   key: 'limit',
    //   value: 100,
    //   name: '近100期'
    // }, 
    {
      key: 'days',
      value: 1,
      name: '今日'
    }, {
      key: 'days',
      value: 2,
      name: '近两天'
    },
  ]

  const filterIsPrimary = (value) => {
    return props.currentFilterValue === value
  }
  const filterControlList = mapWithIndex((filter, index) => <Button
    key={index}
    type={filterIsPrimary(filter.value) ? 'primary' : ''}
    onClick={props.handleFilterChange}
    data-key={filter.value}
  >{filter.name}</Button>
  )(filterList)

  // const checkboxList = mapWithIndex()()
  return (
    <div className="trend-control">
      <div className="trend-control-block">
      {typeControlList}
      </div>
      <div className="trend-control-block">
      {<CheckboxGroup 
        options={effectOptions} 
        defaultValue={[]}
        value={[props.showLine ? 'line' : '', props.showMiss ? 'miss' : '']}
        onChange={props.handleEffect} />}
      </div>
      <div className="trend-control-block-right">
      {filterControlList}
      </div>
      <div className="clearfix"></div>
    </div>
  )
}

TrendControl.propTypes = {
  currentFilterValue: PropTypes.number,
  currentTrendTypeId: PropTypes.number,

  handleTrendTypeChange: PropTypes.func,
  handleFilterChange: PropTypes.func,
  handleEffect: PropTypes.func,
}

export default TrendControl