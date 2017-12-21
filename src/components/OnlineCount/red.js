import React from 'react'
import moment from 'moment'
import { Button } from 'antd'

import OnlineNumber from './OnlineNumber'

const RedOnlineContent = (props) => {

  const { ffc, ffc3d, ticket, planId, openDialogHandler } = props
  return (
    <div>
      <div className={`online-logo-${ticket}`} />
      <div className='online-planId'>
        第<span>{planId}</span>期
          <div>开奖号码</div>
      </div>
      <OnlineNumber number={ticket === 'ffc' ? ffc : ffc3d } type={'red'} />
      <Button className="online-btn" onClick={props.openDialogHandler}>算法说明</Button>
    </div >
  )
}

export default RedOnlineContent