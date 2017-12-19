import React, { Component } from 'react'
import OnlineNumber from './OnlineNumber'



class OnlineCount extends Component {


  render() {

    // const { data } = this.props 
    return (
      <div className="online-container">
        <div className="online-content-left">
          <div className="online-badge"></div>
          <div>{"2017-11-28 15:17:00腾讯同时在线人数"}</div>
          <OnlineNumber number={212805555} />
          <div className="online-hint">
            数据来源于<a href="#">腾讯官网</a>右上角显示的每分钟在线人数
          </div>
        </div>
        <div className="online-content-right">
          <div>
            <div className="title">上一分钟在线人数：</div>
            <div className="result">{'231200703'}</div>
          </div>
          <div>
            <div className="title">实时波动值：</div>
            <div className="result highlight">{`+${4019}`}</div>
          </div>
        </div>

      </div>
    )
  }
}

export default OnlineCount