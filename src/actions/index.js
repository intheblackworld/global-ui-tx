import { axiosService as axios } from 'utils/axios'
import qs from 'qs'

export const fetchTxListSuccess = (payload) => {
  return {
    type: 'FETCH_TX_LIST_SUCCESS',
    payload
  }
}

export const fetchTxList = (data) => {
  return (dispatch) => {
    return axios({
      url: '/lottery/open/txlist.json',
      data: data
    })
      .then(res => {
        dispatch(fetchTxListSuccess(res.data.root))
      })
      .catch(error => {
        throw (error)
      })
  }
}


export const fetchTxSuccess = (payload) => {
  return {
    type: 'FETCH_TX_SUCCESS',
    payload
  }
}

export const fetchTx = () => {
  return (dispatch) => {
    return axios({
      url: '/lottery/open/txcurrent.json',
    })
      .then(res => {
        dispatch(fetchTxSuccess(res.data.root))
      })
      .catch(error => {
        throw (error)
      })
  }
}
