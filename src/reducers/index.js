import { combineReducers } from 'redux'
import fetchTxListReducer from './fetchTxList'
import fetchTxReducer from './fetchTx'
import fetchComboListReducer from './fetchComboList'

const rootReducer = combineReducers({
  txList: fetchTxListReducer,
  txCurrent: fetchTxReducer,
  comboList: fetchComboListReducer
})

export default rootReducer
