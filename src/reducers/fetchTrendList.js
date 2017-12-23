const initState = {
  trendsList: [],
  counStat: {
    
  },
}
const fetchTrendListReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TREND_LIST_SUCCESS':
      return { ...action.payload }
    default:
      return state
      break
  }
}

export default fetchTrendListReducer