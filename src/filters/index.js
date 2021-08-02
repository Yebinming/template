
// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}


export function type(val) {
  return val == 'INDUSTRY' ? '行业' : '领域'
}
//训练模式申请状态（客户端发起）
export function isTrain(val, isTabooTrain) {
  let res;
  const opt = {
    0: "关闭",
    1: "申请中",
    2: "通过",
    3: "拒绝"
  }
  switch (isTabooTrain) {
    case 0:
      res = opt[val]
      break;
    case 1:
      res = '禁用'
  }
  return res
}
//训练模式禁用启用（CMS发起）
export function isTabooTrain(val) {
  const opt = {
    0: "启用",
    1: "禁用"
  }
  return opt[val]
}
// export function isTrainType(val) {
//   const opt = {
//     0: 'danger',
//     1: 'info',
//     2: 'success',
//     3: 'danger'
//   }
//   return opt[val]
// }
export function isTrainType(val, isTabooTrain) {
  let res;
  const opt = {
    0: "danger",
    1: "info",
    2: "success",
    3: "danger"
  }
  switch (isTabooTrain) {
    case 0:
      res = opt[val]
      break;
    case 1:
      res = 'danger'
  }
  return res
}

export function gender(val) {
  return val == 'MAN' ? '男' : '女'
}
export function recommendStatus(val) {
  return val == 'HAVE_MIND' ? '有意向' : val == 'SUCCESS' ? '已成交' : '失败'
}
export function status(val) {
  return val == 'ENABLED' ? '启用' : '禁用'
}
export function types(val) {
  return  val == '0' ? '行业类型' : '产品类型'
}
export function lable(val) {
  return  val == '0' ? '首页' : '活动'
}


/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
