
const initState = {
  rowCount: 0,
  dataList: [
    {
      statTime: 0, // 统计时间
      data: 0, // 在线人数
      change: 0, // 波动值
      planId: "0", // 期号
      ffc: "0,0,0,0,0", // 腾讯分分彩号码
      ffc3d: "0,0,0" // 腾讯3D号码
    }
  ]
}
const fetchTxListReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_TX_LIST":
      return state;
    case "FETCH_TX_LIST_SUCCESS":
      return action.payload;
    default:
      return state;
  }
}

export default fetchTxListReducer