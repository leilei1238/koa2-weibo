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
    attributes: ['userName', 'nickName', 'city', 'picture', 'id'],
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

/**
 *  删除当初用户
 * @param {string} userName
 */
const deleteUser = async userName => {
  const res = await User.destroy({
    where: {
      userName
    }
  })
  //res 返回删除的行数
  return res > 0
}

/**
 * 更新用户信息
 * @param {Object} 要修改的内容 { newNickName, newCity, newPicture, newPassword }
 * @param {Object} 查询条件 { userName, password }
 */
const updateUser = async (
  { newNickName, newCity, newPicture, newPassword },
  { userName, password }
) => {
  //1 拼接修改内容
  let updateData = {}
  if (newNickName) updateData.nickName = newNickName
  if (newCity) updateData.city = newCity
  if (newPicture) updateData.picture = newPicture
  if (newPassword) updateData.password = newPassword
  //2 拼接查询条件
  let whereOpt = { userName }
  if (password) {
    Object.assign(whereOpt, { password })
  }
  //3 执行修改
  const res = await User.update(updateData, {
    where: whereOpt
  })
  //看修改行数是否大于0
  return res[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
