import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { map, addIndex, find } from 'ramda'
import moment from 'moment'
import { toTime, toDate } from 'utils/moment'

import { CustomModal } from 'components/CustomModal'
import TableDatePicker from 'components/Form/TableDatePicker'
import TableSelect from 'components/Form/TableSelect'
import TableFilterGroup from 'components/Form/TableFilterGroup'

import * as calculate from 'utils/calculate' // 拿开奖号码计算各种结果的函式库
import { HomeColumns, FfcColumns, Ffc3dColumns } from './tableConfig'

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
    this.handleSpecialFilterChange = this.handleSpecialFilterChange.bind(this)
    this.openDialogHandler = this.openDialogHandler.bind(this)
    this.closeDialogHandler = this.closeDialogHandler.bind(this)

  }

  static propTypes = {
    // 根据传入的参数决定要显示什么控件: 日期控件, pageSize, pagination
    txList: PropTypes.arrayOf(PropTypes.object),
    rowCount: PropTypes.number,
    handleQueryChange: PropTypes.func,
    needDatePicker: PropTypes.bool.isRequired,
    needPageSize: PropTypes.bool.isRequired,
    needPagination: PropTypes.bool.isRequired,
    needFilter: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool,
  }


  handleDateChange(value) {
    value = value ? toDate(value) : toDate(moment())
    this.props.handleQueryChange({
      day: value ? toDate(value) : toDate(moment()),
      pageSize: this.state.pageSize,
      // 除了首页有分页之外，其他页面没有分页，所以 pageSize 设成1440就可
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

  handleSpecialFilterChange({ day, pageSize, pageIndex }) { // 近100期, 今日
    this.props.handleQueryChange({
      day: this.state.day ? this.state.day : day,
      pageSize,
      pageIndex
    })
    this.setState({
      pageSize,
      day
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
    e.preventDefault()
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
    const { txList, rowCount, isFetching } = this.props

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
            data: calculate.numberWithCommas(tx.data),
            change: `${tx.change >= 0 ? '+' : ''}${tx.change}`,
            statTime: toTime(tx.statTime),
          }
        })(txList)

        break;
      case 'ffc':
        Columns = FfcColumns
        dataSource = mapWithIndex((tx, index) => {
          const ffc = tx.ffc.split(',')
          return {
            ...tx,
            data: calculate.numberWithCommas(tx.data),
            change: `${tx.change >= 0 ? '+' : ''}${tx.change}`,
            statTime: toTime(tx.statTime),
            totalAmount: calculate.totalAmount(ffc), // 总和 数字
            totalResult: calculate.totalResult(ffc), // 总和 字串 ex. 大单
            tenThousand: calculate.calculateByUnit(ffc, 0), // 万位 ex.大单
            thousand: calculate.calculateByUnit(ffc, 1), // 千位 ex.小双
            hundred: calculate.calculateByUnit(ffc, 2), // 百位 ex.大双
            ten: calculate.calculateByUnit(ffc, 3), // 十位 ex.小单
            bit: calculate.calculateByUnit(ffc, 4), // 个位 ex.小单
            bsRatio: calculate.calculateBSRatio(ffc),// 大小比 ex.3:2
            oeRatio: calculate.calculateOERatio(ffc),// 单双比 ex.3:2
            dtResult: calculate.calculateDT(ffc)// 万个龙虎 ex.龙, 虎
          }
        })(txList)
        break;
      case 'ffc3d':
        Columns = Ffc3dColumns
        dataSource = mapWithIndex((tx, index) => {
          const ffc3d = tx.ffc3d.split(',')
          return {
            ...tx,
            data: calculate.numberWithCommas(tx.data),
            change: `${tx.change >= 0 ? '+' : ''}${tx.change}`,
            statTime: toTime(tx.statTime),
            totalAmount: calculate.totalAmount(ffc3d), // 总和 数字
            bsRatio: calculate.calculateBSRatio(ffc3d),// 大小比 ex.3:2
            oeRatio: calculate.calculateOERatio(ffc3d),// 单双比 ex.3:2
            groupResult: calculate.calculateGroup(ffc3d)// 形态 ex.组三
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
          needFilter && <TableFilterGroup onClick={this.handleSpecialFilterChange} />
        }
        {
          needDatePicker && <TableDatePicker onChange={this.handleDateChange} className={tableType === 'home' ? '' : 'small-margin'} />
        }
        {
          needPageSize && <TableSelect onChange={this.handlePageSizeChange} optionList={this.optionList()} />
        }
        <Table
          bordered
          dataSource={dataSource}
          columns={Columns(this.openDialogHandler)}
          rowClassName="table-row"
          loading={isFetching}
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
        {
          tableType === 'ffc' && <div>
            <div className="table-desc-title">说明</div>
            <div className="table-desc">总和：总和即五位开奖号码相加的和值，总和大：23~45，总和小：0~22，总和单：总和为单数；总和双：总和为双数。</div>
            <div className="table-desc">大小：开奖号码为0~4时为小，开奖号码为5~9时为大</div>
            <div className="table-desc">单双：开奖号码为1、3、5、7、9时为单，开奖号码为0、2、4、6、8时为双</div>
            <div className="table-desc">{`万个龙虎：万位开奖号码>个位开奖号码；虎：万位开奖号码<个位开奖号码；和：万位开奖号码=个位开奖号码；`}</div>
          </div>
        }

        {
          tableType === 'ffc3d' && <div>
            <div className="table-desc-title">说明</div>
            <div className="table-desc">总和：总和即三位开奖号码相加的和值，总和大：14~27，总和小：0~23，总和单：总和为单数；总和双：总和为双数。</div>
            <div className="table-desc">大小：开奖号码为0~4时为小，开奖号码为5~9时为大</div>
            <div className="table-desc">单双：开奖号码为1、3、5、7、9时为单，开奖号码为0、2、4、6、8时为双</div>
            <div className="table-desc">{`形态：组六-三个开奖号码各不相同，组三-开奖号码中有两个相同号码，豹子-开奖号码为三个相同号码`}</div>
          </div>
        }
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