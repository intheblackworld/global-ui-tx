import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import moment from 'moment'

import { toDate } from 'utils/moment'

import { fetchTxList, fetchTx } from 'actions'

import OnlineCount from 'components/OnlineCount'
import RuleDescription from 'components/RuleDescription'
import UnFinishHint from 'components/UnFinishHint'

import TableContainer from 'containers/TableContainer'
import Combo from 'containers/Combo'
import Trend from 'containers/Trend'

import './index.scss'

@connect(
  state => ({
    txCollection: state.txList,
    txCurrent: state.txCurrent,
    isFetching: state.isFetching.isFetching
  }),
  dispatch => ({
    fetchTx: () => dispatch(fetchTx()),
    fetchTxList: (reqData) => dispatch(fetchTxList(reqData))
  })
)
class Ffc extends Component {

  constructor(props) {
    super(props)

    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  static propTypes = {
    txCollection: PropTypes.object.isRequired,
    txCurrent: PropTypes.object.isRequired,
    fetchTx: PropTypes.func.isRequired,
    fetchTxList: PropTypes.func.isRequired
  }

  fetchInitData() {
    this.props.fetchTxList({
      day: toDate(moment()),
      pageSize: 100,
      pageIndex: 0
    })
    this.props.fetchTx()
    this.setState({
      configDay: toDate(moment()),
      configPageSize: 100,
      configPageIndex: 0
    })
  }

  fetchDataByCurrentConfig() {
    const { configDay, configPageSize, configPageIndex } = this.state
    this.props.fetchTxList({
      day: configDay,
      pageSize: configPageSize,
      pageIndex: configPageIndex
    })
    this.props.fetchTx()
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

  handleQueryChange(data) {
    this.props.fetchTxList(data)
    this.setState({
      configDay: data.day,
      configPageSize: data.pageSize,
      configPageIndex: data.pageIndex
    })
  }

  render() {
    const { dataList, rowCount } = this.props.txCollection
    const { txCurrent, isFetching } = this.props

    const TabPane = Tabs.TabPane;

    return (
      <div>
        <OnlineCount { ...txCurrent } type={"red"} ticket={"ffc"}/>
        <Tabs type="card">
          <TabPane tab="开奖历史" key="1">
            <TableContainer
              txList={dataList}
              rowCount={rowCount}
              tableType={'ffc'}
              handleQueryChange={this.handleQueryChange}
              needDatePicker={true}
              needPageSize={false}
              needPagination={false}
              needFilter={true}
              isFetching={isFetching}
            />
          </TabPane>
          <TabPane tab="路珠分析" key="2">
          <Combo comboControlType={'ffc'}/>
          </TabPane>
          <TabPane tab="走势分析" key="3">
            <Trend ticketId={31} />
          </TabPane>
          <TabPane tab="开奖说明" key="4">
            <RuleDescription type={'ffc'}/>
          </TabPane>
        </Tabs>
      </div>
      
    )
  }
}

export default Ffc
