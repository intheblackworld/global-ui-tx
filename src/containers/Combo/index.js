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
      url: 'combo.json',
      currentLocation: 0,
      currentLimit: 100,
      limit: 100,
      locations: 0,
    }

    this.handleControlChange = this.handleControlChange.bind(this)
  }


  static propTypes = {
    comboControlType: PropTypes.string.isRequired, // 分分彩, 3D彩
  }

  handleLimitChange(limit) {
    const { comboControlType } = this.props
    const config = this.getConfigByType(comboControlType)
    this.setState({
      limit,
      currentLimit: limit,
      ...config
    })

    this.props.fetchComboList({
      limit,
      ...this.state,
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


  componentDidMount() {
    const { comboControlType } = this.props
    const { limit, locations, currentLimit, currentLocation } = this.state
    const config = this.getConfigByType(comboControlType)
    this.props.fetchComboList({
      url: 'combo.json',
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
          currentLimit={currentLocation} 
          {...this.props} 
          {...controlConfig} 
          handleLimitChange={this.handleLimitChange}
        />
        <div>我是露珠分析</div>
      </div>
    )
  }
}

export default Combo