import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchComboList } from 'actions'

import ComboControl from './ComboControl'
import ComboContainer from './ComboContainer'

import './index.scss'

@connect(
  state => ({
    comboList: state.comboList
  }),
  dispatch => ({
    fetchComboList: (data) => dispatch(fetchComboList(data))
  })
)
class Combo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLocation: 0,
      currentLimit: 100,
      limit: 100,
      locations: 0,
    }

    this.handleControlChange = this.handleControlChange.bind(this)
    this.handleLimitChange = this.handleLimitChange.bind(this)
  }


  static propTypes = {
    comboControlType: PropTypes.string.isRequired, // 分分彩, 3D彩
  }

  handleLimitChange(limit) {
    const { comboControlType } = this.props
    const { currentLocation } = this.state
    const config = this.getConfigByType(comboControlType)
    this.setState({
      ...config,
      limit,
      currentLimit: limit,
      locations: currentLocation
    })

    this.props.fetchComboList({
      ...this.state,
      limit
    })
  }

  handleControlChange(e) {
    const target = e.currentTarget
    const locations = target.dataset.location
    this.setState({
      currentLocation: parseInt(locations, 10),
      locations
    })
    this.props.fetchComboList({
      ...this.state,
      locations
    })
  }

  getConfigByType(type) {
    switch (type) {
      case 'ffc':
        return {
          ticketId: 31,
          limit: 100, // 100, 200 单选
          locations: '0,1,2,3,4', // 位数 单选
          types: '10,11,47' // 大小 单双 龙虎 固定
        }
        break
      case 'ffc3d':
        return {
          ticketId: 36,
          limit: 100, // 100, 200 单选
          locations: '0,1,2', // 位数 单选
          types: '10,11' // 大小 单双 固定
        }
        break
      default:
        return {
          ticketId: 31,
          limit: 100, // 100, 200 单选
          locations: '0,1,2,3,4', // 位数 单选
          types: '10,11,47' // 大小 单双 龙虎 固定
        }
        break;
    }
  }


  fetchInitData() {
    const { comboControlType } = this.props
    const { limit, locations, currentLocation } = this.state
    const config = this.getConfigByType(comboControlType)

    this.props.fetchComboList({
      ticketId: config.ticketId, // 31 //分分彩  36 //3D彩
      limit: 100, // 近100期
      locations: 0, // // 0,1,2,3,4,99: 万, 千, 百, 十, 个, 总和
      types: config.types // 10,11,47 大小, 单双, 龙虎
    })
    this.setState({
      ticketId: config.ticketId,
      limit,
      locations,
      types: config.types
    })
  }

  fetchDataByCurrentConfig() {
    const { comboControlType } = this.props
    const { currentLimit, currentLocation } = this.state
    const config = this.getConfigByType(comboControlType)
    this.props.fetchComboList({
      ticketId: config.ticketId, // 31 //分分彩  36 //3D彩
      limit: currentLimit, // 近100期
      locations: currentLocation, // // 0,1,2,3,4,99: 万, 千, 百, 十, 个, 总和
      types: config.types // 10,11,47 大小, 单双, 龙虎
    })
  }


  componentDidMount() {
    this.fetchInitData()

    this.intervalFetch = setInterval(() => {
      this.fetchDataByCurrentConfig()
    }, 1000 * 60)

  }

  componentWillUnmount() {
    clearInterval(this.intervalFetch)
  }

  render() {
    const { comboControlType } = this.props
    const { currentLimit, currentLocation } = this.state
    const controlConfig = this.getConfigByType(comboControlType)
    return (
      <div className="combo">
        {/* 路珠控制元件 */}
        <ComboControl
          {...controlConfig}
          handleControlChange={this.handleControlChange}
          currentLocation={currentLocation}
        />
        {/* 路珠渲染元件 */}
        <ComboContainer
          currentLimit={currentLimit}
          {...this.props}
          {...controlConfig}
          handleLimitChange={this.handleLimitChange}
        />
        <div className="combo-desc">*当连续开出的相同号码属性中断时，则另起一列显示；</div>
        <div className="combo-desc">*左侧为历史开奖，最右一列为最新开奖；</div>
        <div className="combo-desc">*大：5-9，小：0-4，单：单数号码，双：双数号码；</div>
        <div className="combo-desc">总和：总和即五位开奖号码相加的和值，总和大：23-45；总和小：0-22，总和为单数；总和双：总和为双数；</div>
        <div className="combo-desc">{`龙虎：龙：万位开奖号码>个位开奖号码；虎：万位开奖号码<个位开奖号码；和：万位开奖号码=个位开奖号码；`}</div>
      </div>
    )
  }
}

export default Combo