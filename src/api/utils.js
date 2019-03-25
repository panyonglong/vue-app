// 工具函数

// 类型检测 可区分[],{}
function _toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 是否为空
export function isEmpty (v) {
  switch (_toType(v)) {
    case 'null':
      return true
    case 'undefined':
      return true
    case 'string':
      if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0) return true
      break
    case 'boolean':
      if (!v) return true
      break
    case 'number':
      if (v === 0 || isNaN(v)) return true
      break
    case 'object':
      if (v === null || JSON.stringify(v) === '{}') return true
      break
    case 'array':
      if (v.length === 0) return true
      break
  }
  return false
}

// 倒计时 t-时间间隔
export function timeDown (t) {
  t = parseInt(t / 1000)
  let S = t % 60
  t = parseInt(t / 60)
  let M = t % 60
  t = parseInt(t / 60)
  let H = t % 24
  let d = parseInt(t / 24)
  if (M < 10) M = '0' + M
  if (S < 10) S = '0' + S

  let date = {
    d: d,
    H: H,
    M: M,
    S: S
  }
  return date
}

const _monthEn = ['January','February','March','April','May','June','July',
  'August','September','October','November','December']
// 时间转字符串 t-时间戳或字符串 format-模板 单数不补0 双数补0 B-英文月份
export function strDate (t, format = 'YY-mm-dd HH:MM:SS') {
  let date = new Date(t)
  let YY = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let M = date.getMinutes()
  let S = date.getSeconds()
  let mon = _monthEn[m - 1]

  let mm = m < 10 ? ('0' + m) : m
  let dd = d < 10 ? ('0' + d) : d
  let HH = H < 10 ? ('0' + H) : H
  let MM = M < 10 ? ('0' + M) : M
  let SS = S < 10 ? ('0' + S) : S

  let matchData = {
    'YY': YY, 'mm': mm, 'dd': dd, 'HH': HH, 'MM': MM, 'SS': SS,
    'm': m, 'd': d, 'H': H, 'M': M, 'S': S, 'B': mon
  }
  let reg = /[YmdHMSB]+/g  
  let str = format.replace(reg, r => {
    return matchData[r]
  })
  return str
}

// 去掉小数点指定位数后面的值
export function fixedNum (val, size) {
  if (!val) return 0
  let str = val.toString()
  let i = str.search(/\./)
  let j = str.search(/e/)
  let e = ''
  if (j !== -1) {
    e = str.substring(j, str.length)
    str = str.substring(0, j)
  } 
  if (i !== -1) {
    val = str.substring(0, i + size + 1)
  }
  return parseFloat(val + e)
}

// 用来加载一些不能通过import或者require引入的js 会直接执行在全局环境
export function getJS (url) {
  const promise = new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = true
    if (script.readyState) {
      script.onreadystatechange = function (e) {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null
          resolve(e)
        }
      }
    } else {
      script.onload = function (e) {
        resolve(e)
      }
      script.onerror = function (e) {
        reject(new Error('getjs error'))
      }
    }
    script.src = url
    document.body.appendChild(script)
  })

  return promise
}

// 下载对应url
export function download (url, name) {
  const aLink = document.createElement('a')
  aLink.download = name
  aLink.href = url
  aLink.dispatchEvent(new MouseEvent('click', {}))
}

export default {
  isEmpty,
  timeDown,
  strDate,
  fixedNum,
  getJS,
  download
}
