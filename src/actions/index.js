import { axiosService as axios, jsonpService as jsonp } from 'utils/axios'
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

export const fetchComboListSuccess = (payload) => {
  return {
    type: 'FETCH_COMBO_LIST_SUCCESS',
    payload
  }
}

export const fetchComboList = (data) => {
  data = Object.assign(data, {}, {
    url: 'combo.json',
  })
  return (dispatch) => {
    return jsonp(data)
      .then(response => {
        return response.json()
      })
      .then((res) => {
        return dispatch(fetchComboListSuccess(res.root))
      })
      .catch(error => {
        throw (error)
      })
  }
}
