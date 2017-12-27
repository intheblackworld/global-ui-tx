import { combineReducers } from 'redux'
import fetchTxListReducer from './fetchTxList'
import fetchTxReducer from './fetchTx'
import fetchComboListReducer from './fetchComboList'
import fetchTrendListReducer from './fetchTrendList'
import isFetchingReducer from './isFetching'

const rootReducer = combineReducers({
  txList: fetchTxListReducer,
  txCurrent: fetchTxReducer,
  comboList: fetchComboListReducer,
  trendList: fetchTrendListReducer,
  isFetching: isFetchingReducer
})

export default rootReducer
