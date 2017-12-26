import React from 'react'

import LineTo from 'react-lineto'

const Line = (props) => {
  return (
    <LineTo
      from={props.from} 
      to={props.to}
      zIndex={0}
      border={`2px solid ${props.color}`}
    />
  )
}

export default Line