import axios from 'axios'
import qs from 'qs'
import fetchJsonp from 'fetch-jsonp'
import { map } from 'ramda'


export const axiosService = (params) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: params.url,
    data: qs.stringify(params.data)
  })
}

export const jsonpService = (parameters) => {
  const { url } = parameters
  const paramList = Object.keys(parameters)

  const params = map((param) => {
    if (param === 'url') {
      return
    }
    return `${param}=${parameters[param]}`
  })(paramList).join('&')
  return fetchJsonp(`http://trend.ybf01.com/trends/trend/${url}?${params}`, {
    jsonp: 'callback'
  })
}
