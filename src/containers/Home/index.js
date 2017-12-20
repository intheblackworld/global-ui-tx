import React, { Component } from 'react'
import PropTypes from 'prop-types'
import OnlineCount from 'components/OnlineCount'
import TableContainer from 'components/TableContainer'
import { fetchTxList, fetchTx } from 'actions'
import { connect } from 'react-redux'
import moment from 'moment'

import { toDate } from 'utils/moment'


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
class Home extends Component {

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
      pageSize: 20,
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
    return (
      <div>
        <OnlineCount {...txCurrent}/>
        <TableContainer
          txList={dataList}
          rowCount={rowCount}
          handleQueryChange={this.handleQueryChange}
        />
        {/* <Pagination /> */}
      </div>
    )
  }
}

export default Home
