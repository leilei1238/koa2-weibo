/**
 * @description user services
 */
const { User } = require('../db/model')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName
 * @param {string} password
 */
const getUserInfo = async (userName, password) => {
  //查询条件
  let whereOpt = { userName }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  //查询
  const res = await User.findOne({
    attributes: ['userName', 'nickName', 'gender', 'city', 'picture'],
    where: whereOpt
  })

  //没找到的处理
  if (res == null) {
    return res
  }
  //格式化处理
  const formatRes = formatUser(res.dataValues)
  return formatRes
}

/**
 * 创建用户
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName
 */
const createUser = async ({ userName, password, gender = 3, nickName }) => {
  //创建用户
  const res = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return res.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}
