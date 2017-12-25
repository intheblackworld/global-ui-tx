import React from 'react'

import './index.scss'


const UnFinishHint = (props) => {
  return (
    <div className="unFinish-container">
      <div className="unFinish-icon"></div>
      <div className="unFinish-desc">{props.desc}</div>
    </div>
  )
}

export default UnFinishHint