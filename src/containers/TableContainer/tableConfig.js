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
export const FfcColumns = (dialogHandler) => (
  [
    {
      title: '开奖时间',
      dataIndex: 'statTime',
      key: 'statTime',
      className: 'table-header',
    }, {
      title: '期号',
      dataIndex: 'planId',
      key: 'planId',
      className: 'table-header',
    }, {
      title: '开奖号码',
      dataIndex: 'ffc',
      key: 'ffc',
      className: 'table-header',
    }, {
      title: '在线人数',
      dataIndex: 'data',
      key: 'data',
      className: 'table-header',
    }, {
      title: '波动值',
      dataIndex: 'change',
      key: 'change',
      className: 'table-header',
    }, {
      title: '总和',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      className: 'table-header',
      colSpan: 2,
      width: 48,
    }, {
      title: '总和',
      dataIndex: 'totalResult',
      key: 'totalResult',
      className: 'table-header',
      colSpan: 0,
      width: 48,
    }, {
      title: '万位',
      dataIndex: 'tenThousand',
      key: 'tenThousand',
      className: 'table-header',
    }, {
      title: '千位',
      dataIndex: 'thousand',
      key: 'thousand',
      className: 'table-header',
    }, {
      title: '百位',
      dataIndex: 'hundred',
      key: 'hundred',
      className: 'table-header',
    }, {
      title: '十位',
      dataIndex: 'ten',
      key: 'ten',
      className: 'table-header',
    }, {
      title: '个位',
      dataIndex: 'bit',
      key: 'bit',
      className: 'table-header',
    }, {
      title: '大小比',
      dataIndex: 'bsRatio',
      key: 'bsRatio',
      className: 'table-header',
    }, {
      title: '单双比',
      dataIndex: 'oeRatio',
      key: 'oeRatio',
      className: 'table-header',
    }, {
      title: '万位龙虎',
      dataIndex: 'dtResult',
      key: 'dtResult',
      className: 'table-header',
    },
  ]
)

// 3D 表格栏位设定