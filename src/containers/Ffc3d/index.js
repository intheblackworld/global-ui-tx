import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import moment from 'moment'

import { toDate } from 'utils/moment'

import { fetchTxList, fetchTx } from 'actions'

import OnlineCount from 'components/OnlineCount'
import TableContainer from 'containers/TableContainer'

@connect(
  state => ({
    txCollection: state.txList,
    txCurrent: state.txCurrent
  }),
  dispatch => ({
    fetchTx: () => dispatch(fetchTx()),
    fetchTxList: (reqData) => dispatch(fetchTxList(reqData))
  })
)
class Ffc3d extends Component {

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

  componentDidMount() {
    this.props.fetchTxList({
      day: toDate(moment()),
      pageSize: 100,
      pageIndex: 0
    })
    this.props.fetchTx()
  }

  handleQueryChange(data) {
    this.props.fetchTxList(data)
  }

  render() {
    const { dataList, rowCount } = this.props.txCollection
    const { txCurrent } = this.props

    const TabPane = Tabs.TabPane;

    return (
      <div>
        <OnlineCount { ...txCurrent } type={"red"} ticket={"ffc3d"}/>
        <Tabs type="card">
          <TabPane tab="开奖历史" key="1">
            <TableContainer
              txList={dataList}
              rowCount={rowCount}
              tableType={'ffc3d'}
              handleQueryChange={this.handleQueryChange}
              needDatePicker={true}
              needPageSize={false}
              needPagination={false}
              needFilter={true}
            />
          </TabPane>
          <TabPane tab="路珠分析" key="2">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="走势分析" key="3">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
          <TabPane tab="开奖说明" key="4">
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
            <p>Content of Tab Pane 3</p>
          </TabPane>
        </Tabs>
      </div>
      
    )
  }
}

export default Ffc3d
