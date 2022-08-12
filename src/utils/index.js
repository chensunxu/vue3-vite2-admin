import { isJSON } from './validate'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele, className) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

/**
 * @description Convert bytes to MB/GB/T
 * @param {Number} size bytes
 * @returns {string}
 */
export const showSize = (size) => {
  let data = ''
  if (size < 1048576) {
    data = Number((size / 1024).toFixed(2)) + 'KB'
  } else if (size === 1048576) {
    data = '1MB'
  } else if (size > 1048576 && size < 1073741824) {
    data = Number((size / (1024 * 1024)).toFixed(2)) + 'MB'
  } else if (size > 1048576 && size === 1073741824) {
    data = '1GB'
  } else if (size > 1073741824 && size < 1099511627776) {
    data = Number((size / (1024 * 1024 * 1024)).toFixed(2)) + 'GB'
  } else {
    data = '文件超过1TB'
  }
  return data
}

/**
 * @desc array merger
 * @param {Array} array
 */
export function arrayMerger() {
  const arr = [].concat.apply([], arguments)
  return Array.from(new Set(arr))
}

// 深拷贝 val
export function deepCopy(val) {
  return JSON.parse(JSON.stringify(val))
}

// Json转换为数组
export function jsonToArray(jsonStr, defaultVal = []) {
  return isJSON(jsonStr) ? JSON.parse(jsonStr) : defaultVal
}

/**
 * @description 过滤对象
 * @param {Object} obj 过滤前数据
 * @param {Array} arr 过滤条件，要求为数组
 * @param {Boolean} sort true 正向 | false 反向 默认反向
 * @return {Object} 新对象
 */
export function filterObj(obj, arr, sort = false) {
  if (typeof obj !== 'object' || !Array.isArray(arr)) {
    throw new Error('参数格式不正确')
  }
  const result = {}
  Object.keys(obj)
    .filter((key) => (sort ? arr.includes(key) : !arr.includes(key)))
    .forEach((key) => {
      result[key] = obj[key]
    })
  return result
}
