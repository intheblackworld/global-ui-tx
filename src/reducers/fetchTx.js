const initState = {
  startTime: 1333333333,
  data: 240018030,
  change: -1,
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