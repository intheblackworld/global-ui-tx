import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OnlineNumber from './OnlineNumber'
import moment from 'moment'

class OnlineCount extends Component {

  static propTypes = {
    startTime: PropTypes.number, // 统计时间
    data: PropTypes.number, // 在线人数
    change: PropTypes.number // 波动值
  }

  render() {
    const { startTime, data, change } = this.props 
    return (
      <div className="online-container">
        <div className="online-content-left">
          <div className="online-badge"></div>
          <div>{moment(startTime).format('YYYY-MM-DD HH:mm:ss')}腾讯同时在线人数</div>
          <OnlineNumber number={data} />
          <div className="online-hint">
            数据来源于<a href="http://im.qq.com" target="_blank">腾讯官网</a>右上角显示的每分钟在线人数
          </div>
        </div>
        <div className="online-content-right">
          <div>
            <div className="title">上一分钟在线人数：</div>
            <div className="result">{data - change}</div>
          </div>
          <div>
            <div className="title">实时波动值：</div>
            <div className="result highlight">{`${change}`}</div>
          </div>
        </div>

      </div>
    )
  }
}

export default OnlineCount