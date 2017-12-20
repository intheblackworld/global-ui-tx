import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { map, addIndex, find } from 'rambda'
import moment from 'moment'
import { toTime, toDate } from 'utils/moment'

import { CustomModal } from 'components/CustomModal'
import TableDatePicker from '../Form/TableDatePicker'
import TableSelect from '../Form/TableSelect'
import { HomeColumns } from './tableConfig'

import './index.scss'

class TableContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      day: toDate(moment()),
      pageSize: 20,
      modalVisible: false
    }
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handlePageIndexChange = this.handlePageIndexChange.bind(this)
    this.openDialogHandler = this.openDialogHandler.bind(this)
    this.closeDialogHandler = this.closeDialogHandler.bind(this)

  }

  static propTypes = {
    // 根据传入的参数决定要显示什么控件: 日期控件, pageSize, pagination
    txList: PropTypes.arrayOf(PropTypes.object),
    rowCount: PropTypes.number,
    handleQueryChange: PropTypes.func.isRequired
  }


  handleDateChange(value) {
    value = value ? toDate(value) : toDate(moment())
    this.props.handleQueryChange({
      day: value ? toDate(value) : toDate(moment()),
      pageSize: this.state.pageSize,
      pageIndex: 0,
    })
    this.setState({day: value})
  }

  handlePageSizeChange(value) {
    this.props.handleQueryChange({
      day: this.state.day,
      pageSize: value,
      pageIndex: 0,
    })
    
    this.setState({pageSize: value})
  }

  handlePageIndexChange(page, pageSize) {
    this.props.handleQueryChange({
      day: this.state.day,
      pageSize: pageSize,
      pageIndex: page - 1,
    })
  }

  optionList = () => [
    {
      value: 20,
      name: '20条'
    },
    {
      value: 50,
      name: '50条'
    }
  ]

  openDialogHandler(e) {
    const text = e.currentTarget.text
    let dialogType
    let currentItem

    const findFfc = (openNumber) => text === openNumber.ffc
    const findFfc3d = (openNumber) => text === openNumber.ffc3d

    if (text.length === 9) { // 腾讯分分彩说明
      dialogType = 'ffc'
      currentItem = find(findFfc)(this.props.txList)
    } else { // 腾讯3D彩说明
      dialogType = 'ffc3d'
      currentItem = find(findFfc3d)(this.props.txList)
    }
    
    this.setState({
      modalVisible: true,
      modalData: {
        dialogType,
        ...currentItem
      }
    })
  }

  closeDialogHandler(e) {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { txList, rowCount } = this.props
    const mapWithIndex = addIndex(map)
    const dataSource = mapWithIndex((tx, index) => {
      return {
        ...tx,
        startTime: toTime(tx.startTime),
      }
    })(txList)

    return (
      <div className="table-container">
        <TableDatePicker onChange={this.handleDateChange} />
        <TableSelect onChange={this.handlePageSizeChange} optionList={this.optionList()} />
        <Table
          bordered
          dataSource={dataSource}
          columns={HomeColumns(this.openDialogHandler)}
          rowClassName="table-row"
          pagination={
            {
              showQuickJumper: true,
              total: rowCount,
              pageSize: this.state.pageSize,
              onChange: this.handlePageIndexChange
            }
          }
        />
        <CustomModal
          modalData= {this.state.modalData}
          modalVisible={this.state.modalVisible} 
          closeDialogHandler={this.closeDialogHandler}
        />
      </div>
    )
  }
}

export default TableContainer