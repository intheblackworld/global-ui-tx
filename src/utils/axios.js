import axios from 'axios'
import qs from 'qs'
import fetchJsonp from 'fetch-jsonp'


export const axiosService = (params) => {
  return axios({
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: params.url,
    data: qs.stringify(params.data)
  })
}

export const jsonpService = (parameters) => {
  const {
    url,
    ticketId, // 31 //分分彩  36 //3D彩
    limit, // 近100期
    
    // 分分彩 0,1,2,3,4,99: 万, 千, 百, 十, 个, 总和
    // 3D彩 0,1,2,99: 百, 十, 个, 总和
    locations,
    
    // 分分彩 10,11,47 大小, 单双, 龙虎
    // 3D彩 10, 11 大小, 单双
    types
  } = parameters
  return fetchJsonp(`http://trend.ybf01.com/trends/trend/${url}?ticketId=${ticketId}&limit=${limit}&locations=${locations}&types=${types}`, {
    jsonp: 'callback'
  })
}
