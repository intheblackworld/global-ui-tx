import React from 'react'
import { Table } from 'antd'

import { BasicTrendColumns, CompositeTrendColumns } from './TrendConfig'


const TrendTable = (props) => {
  return (
    <Table
      rowKey="uid"
      bordered
      dataSource={[]}
      columns={props.trendType === 1 ? BasicTrendColumns : CompositeTrendColumns}
      rowClassName="table-row"
      pagination={false}
    />
  )
}

export default TrendTable