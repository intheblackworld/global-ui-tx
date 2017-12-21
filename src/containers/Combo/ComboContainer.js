import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ComboSection from './ComboSection'

const ComboContainer = (props) => {
  const {
    tenThousands,
    thousands,
    hundreds,
    tens,
    units,
    sumValues,
    LHH,
  } = props.comboList

  const {
    currentLocation
  } = props
  return (
    <div>
      {
        tenThousands && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        thousands && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        hundreds && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        tens && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        units && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        sumValues && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }

      {
        LHH && <ComboSection currentLocation={currentLocation} handleLimitChange={props.handleLimitChange} typeName={'大小'} bigCount={45} smallCount={55} oddCount={22} evenCount={78} />
      }


      
    </div>
  )
}

ComboContainer.propTypes = {
  handleLimitChange: PropTypes.func.isRequired,
  currentLocation: PropTypes.number,
}

export default ComboContainer