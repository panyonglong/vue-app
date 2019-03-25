// axios封装

import axios from 'axios'
console.log(process.env.BASEURL)
// axios 配置
axios.defaults.timeout = process.env.TIMEOUT
axios.defaults.baseURL = process.env.BASEURL
// 解决post 问题 
// 有时候要后台用不同的方式获取参数，就不能用默认，要改成手动添加
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// const qs = require('qs')
// params = qs.stringify(params)
// 允许跨域请求带上cookie
axios.defaults.withCredentials=true;

// 参数
function _formatParams (params, method) {
  if (!params) {
    params = {}
  }
  if (method === 'get') {
    params['t'] = Date.now()
  }
  return params
}

// 请求头
function _formatHeaders (acHeaders) {
  let headers = {}

  if (acHeaders) {
    for (let i in acHeaders) {
      headers[i] = acHeaders[i]
    }
  }
  return headers
}

function http ({url, method, params, headers}) {
  method = method.toLowerCase()
  let dataOrParams = 'params'
  
  if(method === 'post' || method === 'put') {
    dataOrParams = 'data';
  }


  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      [dataOrParams]: _formatParams(params, method),
      headers: _formatHeaders(headers),
    })
      .then(res => {
        // 请求成功
        console.log(`http ${method} success: ${url} ${res.status}`)
        console.log(res.data)
        resolve(res.data)
      })
      .catch(err => {
        // 请求失败
        reject(err)
        console.log(`http ${method} error: ${url} ; Error: ${err}`)
        throw new Error(`Error:${err}`)
      })
  })
}

export default http
