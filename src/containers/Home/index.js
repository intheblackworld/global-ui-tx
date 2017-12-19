import React, { Component } from 'react'
import OnlineCount from 'components/OnlineCount'
import Table from 'components/Table'

class Home extends Component {


  render() {
    return (
      <div>
        <OnlineCount />
        <Table />
        {/* <Pagination /> */}
      </div>
    )
  }
}

export default Home
