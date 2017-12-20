import axios from 'axios'
import qs from 'qs'

export const axiosService = (params) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: params.url,
    data: qs.stringify(params.data)
  })
}
