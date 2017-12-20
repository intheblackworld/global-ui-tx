import React from 'react'

// 首页表格栏位设定
export const HomeColumns = (dialogHandler) => (
  [
    {
      title: '在线人数统计',
      className: 'table-header',
      children: [
        {
          title: '统计时间',
          dataIndex: 'statTime',
          key: 'statTime',
          width: 200,
        }, {
          title: '在线人数',
          dataIndex: 'data',
          key: 'data',
          width: 200,
        }, {
          title: '波动值',
          dataIndex: 'change',
          key: 'change',
          width: 200,
        },
      ],
    }, {
      title: '数据彩开奖',
      className: 'table-header',
      children: [
        {
          title: '期号',
          dataIndex: 'planId',
          key: 'planId',
          width: 200,
        }, {
          title: '腾讯分分彩',
          dataIndex: 'ffc',
          key: 'ffc',
          width: 200,
          render: (text, record) => (
            <span>
              <a href="#" onClick={dialogHandler}>{`${text}`}</a>
            </span>
          )
        }, {
          title: '腾讯3D',
          dataIndex: 'ffc3d',
          key: 'ffc3d',
          width: 200,
          render: (text, record) => (
            <span>
              <a href="#" onClick={dialogHandler}>{`${text}`}</a>
            </span>
          )
        }
      ],
    }
  ]
)

// 分分彩表格栏位设定


// 3D 表格栏位设定