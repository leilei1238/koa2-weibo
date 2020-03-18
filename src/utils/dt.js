/**
 * @description 时间相关的工具函数
 */

const { format } = require('date-fns')

/**
 * 时间格式化
 * @param {string} str 时间字符串
 */
const timeFormat = str => {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}
