/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile(mobile) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(mobile)
}

/**
 * @param {string} number
 * @returns {Boolean}
 */
export function validNumber(number) {
  const reg = /^[0-9]+$/
  return reg.test(number)
}

/**
 * @param {string} number
 * @returns {Boolean}
 */
export function validPassword(password) {
  const reg = /^[0-9A-Za-z]{6,}$/
  return reg.test(password)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {string} str
 * @returns {object}
 */
export function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {JSON} str
 * @returns {Boolean}
 */
export function isJSON(str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return
}

// 判断是否为空
export function isEmpty(str) {
  if (str === '' || str === null || str === undefined || str.length === 0) {
    return true
  }
  return false
}
