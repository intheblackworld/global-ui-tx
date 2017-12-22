const initState = {
  statTime: 1333333333,
  data: 240018030,
  change: -1,
  planId: "201712190123",
  ffc: "0,0,0,0,0",
  ffc3d: "0,0,0"

}
const fetchTxReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TX':
      return state
    case 'FETCH_TX_SUCCESS':
      return { ...action.payload }
    default:
      return state
      break
  }
}

export default fetchTxReducer