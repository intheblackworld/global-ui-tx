import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { map, addIndex, find } from 'rambda'
import moment from 'moment'
import { toTime, toDate } from 'utils/moment'

import { CustomModal } from 'components/CustomModal'
import TableDatePicker from 'components/Form/TableDatePicker'
import TableSelect from 'components/Form/TableSelect'

import * as calculate from 'utils/calculate' // 拿开奖号码计算各种结果的函式库
import { HomeColumns, FfcColumns } from './tableConfig'

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
    handleQueryChange: PropTypes.func.isRequired,
    needDatePicker: PropTypes.bool.isRequired,
    needPageSize: PropTypes.bool.isRequired,
    needPagination: PropTypes.bool.isRequired,
    needFilter: PropTypes.bool.isRequired,
  }


  handleDateChange(value) {
    value = value ? toDate(value) : toDate(moment())
    this.props.handleQueryChange({
      day: value ? toDate(value) : toDate(moment()),
      pageSize: this.state.pageSize,
      pageIndex: 0,
    })
    this.setState({ day: value })
  }

  handlePageSizeChange(value) {
    this.props.handleQueryChange({
      day: this.state.day,
      pageSize: value,
      pageIndex: 0,
    })

    this.setState({ pageSize: value })
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
    
    const {
      needDatePicker,
      needPageSize,
      needPagination,
      needFilter,
      tableType
    } = this.props

    const mapWithIndex = addIndex(map)

    let Columns
    let dataSource
    switch (tableType) {
      case 'home':
        Columns = HomeColumns
        dataSource = mapWithIndex((tx, index) => {
          return {
            ...tx,
            startTime: toTime(tx.startTime),
          }
        })(txList)

        break;
      case 'ffc':
        Columns = FfcColumns
        dataSource = mapWithIndex((tx, index) => {
          const ffc = tx.ffc.split(',')
          return {
            ...tx,
            startTime: toTime(tx.startTime),
            totalAmount: calculate.totalAmount(ffc), // 总和 数字
            totalResult: calculate.totalResult(ffc), // 总和 字串 ex. 大单
            tenThousand: calculate.calculateByUnit(ffc, 0), // 万位 ex.大单
            thousand: calculate.calculateByUnit(ffc, 1), // 千位 ex.小双
            hundred: calculate.calculateByUnit(ffc, 2), // 百位 ex.大双
            ten: calculate.calculateByUnit(ffc, 3), // 十位 ex.小单
            bit: calculate.calculateByUnit(ffc, 4), // 个位 ex.小单
            bsRatio: calculate.calculateBSRatio(ffc),// 大小比 ex.3:2
            oeRatio: calculate.calculateOERatio(ffc),// 单双比 ex.3:2
            dtResult: '龙'// 万个龙虎 ex.龙, 虎
          }
        })(txList)
        break;
      default:
        Columns = HomeColumns
        break;
    }

    

    return (
      <div className="table-container">
        {
          needDatePicker && <TableDatePicker onChange={this.handleDateChange} />
        }
        {
          needPageSize && <TableSelect onChange={this.handlePageSizeChange} optionList={this.optionList()} />
        }
        <Table
          bordered
          dataSource={dataSource}
          columns={Columns(this.openDialogHandler)}
          rowClassName="table-row"
          pagination={
            needPagination ?
              {
                showQuickJumper: true,
                total: rowCount,
                pageSize: this.state.pageSize,
                onChange: this.handlePageIndexChange
              } : false
          }
        />
        <CustomModal
          modalData={this.state.modalData}
          modalVisible={this.state.modalVisible}
          closeDialogHandler={this.closeDialogHandler}
        />
      </div>
    )
  }
}

export default TableContainer