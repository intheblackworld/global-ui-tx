import { combineReducers } from 'redux'
import fetchTxListReducer from './fetchTxList'
import fetchTxReducer from './fetchTx'

const rootReducer = combineReducers({
  txList: fetchTxListReducer,
  txCurrent: fetchTxReducer
})

export default rootReducer
