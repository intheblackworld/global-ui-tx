import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NormalOnlineContent from './normal'
import RedOnlineContent from './red'

import { CustomModal } from 'components/CustomModal'

class OnlineCount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    }

    this.openDialogHandler = this.openDialogHandler.bind(this)
    this.closeDialogHandler = this.closeDialogHandler.bind(this)

  }
  static propTypes = {
    startTime: PropTypes.number, // 统计时间
    data: PropTypes.number, // 在线人数
    change: PropTypes.number, // 波动值
    planId: PropTypes.string, // 期号
    ffc: PropTypes.string, // 分分彩号
    ffc3d: PropTypes.string, // 3D彩号
  }

  openDialogHandler() {
    const dialogType = this.props.ticket

    this.setState({
      modalVisible: true,
      modalData: {
        dialogType,
        ...this.props
      }
    })
  }

  closeDialogHandler(e) {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { startTime, data, change, type } = this.props
    return (
      <div className="online-container">
        <div className="online-content-left">
          {
            type === 'red' && <RedOnlineContent {...this.props} openDialogHandler={this.openDialogHandler}/>
          }
          {
            type === 'normal' && <NormalOnlineContent {...this.props} />
          }
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

        <CustomModal
          modalData={this.state.modalData}
          modalVisible={this.state.modalVisible}
          closeDialogHandler={this.closeDialogHandler}
        />
      </div>

    )
  }
}

export default OnlineCount