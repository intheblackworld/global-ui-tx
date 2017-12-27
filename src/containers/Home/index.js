import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { toDate } from 'utils/moment'

import { fetchTxList, fetchTx } from 'actions'

import OnlineCount from 'components/OnlineCount'
import TableContainer from 'containers/TableContainer'

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
class Home extends Component {

  constructor(props) {
    super(props)

    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  static propTypes = {
    txCollection: PropTypes.object.isRequired,
    txCurrent: PropTypes.object.isRequired,
    fetchTx: PropTypes.func.isRequired,
    fetchTxList: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
  }


  fetchInitData() {
    this.props.fetchTxList({
      day: toDate(moment()),
      pageSize: 20,
      pageIndex: 0
    })
    this.props.fetchTx()
    this.setState({
      configDay: toDate(moment()),
      configPageSize: 20,
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
    return (
      <div>
        <OnlineCount {...txCurrent} type={'normal'} />
        <div className="container">
          <TableContainer
            txList={dataList}
            rowCount={rowCount}
            tableType={'home'}
            handleQueryChange={this.handleQueryChange}
            needDatePicker={true}
            needPageSize={true}
            needPagination={true}
            needFilter={false}
            isFetching={isFetching}
          />
        </div>
      </div>
    )
  }
}

export default Home
