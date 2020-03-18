/**
 * @description 数据格式化 _inner
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
/**
 * 用户默认头像
 * @param {Object} obj
 */
const _formatUserPicture = obj => {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表｜单个用户信息
 */
const formatUser = list => {
  if (list == null) {
    return list
  }
  //数组 用户列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }
  //单个对象
  return _formatUserPicture(list)
}

const _formatDBTime = obj => {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博信息
 * @param {Object|Array} list 对象|数组
 */
const formatBlog = list => {
  if (list == null) {
    return list
  }

  //数组
  if (list instanceof Array) {
    return list.map(_formatDBTime)
  }

  //对象
  result = _formatDBTime(list)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
