import React from 'react'
import moment from 'moment'

import OnlineNumber from './OnlineNumber'

const NormalOnlineContent = (props) => {
  const { startTime, data, type } = props
  return (
    <div>
      <div className="online-badge"></div>
      <div>{moment(startTime).format('YYYY-MM-DD HH:mm:ss')}腾讯同时在线人数</div>
      <OnlineNumber number={data} type={type} />
      <div className="online-hint">
        数据来源于<a href="http://im.qq.com" target="_blank">腾讯官网</a>右上角显示的每分钟在线人数
      </div>
    </div>
  )
}

export default NormalOnlineContent