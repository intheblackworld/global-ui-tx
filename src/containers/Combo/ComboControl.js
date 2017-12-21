import React from 'react'
import PropTypes from 'prop-types'
import { map, addIndex } from 'rambda'
import { Button } from 'antd';


export const ComboControl = (props) => {
  const { locations, currentLocation } = props

  const mapWithIndex = addIndex(map)
  
  let locationList = locations.split(',')
  const fivelocationNameList = ['万位', '千位', '百位', '十位', '个位', '和值']
  const threelocationNameList = ['百位', '十位', '个位', '和值']

  if (locationList.length === 3) {
    locationList = threelocationNameList
  } else if (locationList.length === 5) {
    locationList = fivelocationNameList
  }

  const buttonList = mapWithIndex((locationName, index) => {
    if (index === locationList.length - 1) {
      return <Button 
        key={99} 
        type= {(currentLocation === index || currentLocation === 99) ? 'primary' : ''}
        onClick={props.handleControlChange} 
        data-location={99}
      >
        {locationName}
      </Button>
    }
    return <Button 
      key={index}
      type= {currentLocation === index ? 'primary' : ''}
      onClick={props.handleControlChange} 
      data-location={index}>
      {locationName}
    </Button>
  })(locationList)
  return (
    <div>
      {buttonList}
    </div>
  )
}


ComboControl.propTypes = {
  locations: PropTypes.string,
  currentLocation: PropTypes.number,
  handleControlChange: PropTypes.func
}

export default ComboControl