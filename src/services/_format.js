/**
 * @description 数据格式化 _inner
 */

const { DEFAULT_PICTURE, REG_FO_AT_WHO } = require('../conf/constant')
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
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
const _formatContent = obj => {
  obj.contentFormat = obj.content
  //格式化 @ '哈喽 @张三-zhangsan 你好！' '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FO_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}"> @${nickName} </a>`
    }
  )
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
    return list.map(_formatDBTime).map(_formatContent)
  }

  //对象
  result = _formatDBTime(list)
  result = _formatContent(list)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
