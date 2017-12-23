import { combineReducers } from 'redux'
import fetchTxListReducer from './fetchTxList'
import fetchTxReducer from './fetchTx'
import fetchComboListReducer from './fetchComboList'
import fetchTrendListReducer from './fetchTrendList'

const rootReducer = combineReducers({
  txList: fetchTxListReducer,
  txCurrent: fetchTxReducer,
  comboList: fetchComboListReducer,
  trendList: fetchTrendListReducer
})

export default rootReducer
