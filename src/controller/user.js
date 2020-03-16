/**
 * @description user controller
 */

const doCrypto = require('../utils/cryp')
const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo
} = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param {string} userName
 */
const isExist = async userName => {
  //services
  const res = await getUserInfo(userName)
  if (res) {
    //用户名已存在
    return new SuccessModel(res)
  }
  //用户名不存在
  return new ErrorModel(registerUserNameNotExistInfo)
}

/**
 * 用户注册
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 */
const register = async ({ userName, password, gender }) => {
  //判断用户名是否已存在
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }
  //为存在，进行注册 controller
  try {
    await createUser({ userName, password: doCrypto(password), gender })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 用户登录
 * @param {Object} ctx
 * @param {string} userName
 * @param {string} password
 */
const login = async (ctx, { userName, password }) => {
  password = doCrypto(password)
  const userInfo = await getUserInfo(userName, password)
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  //登录成功：userInfo放入session
  ctx.session.userInfo = userInfo
  return new SuccessModel()
}
/**
 * 删除当前用户
 * @param {Object} ctx
 * @param {string} userName
 */
const deleteCurUser = async userName => {
  //services
  const res = await deleteUser(userName)
  if (res) {
    //成功
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture
 */
const changeInfo = async (ctx, { nickName, city, picture }) => {
  const { userName } = ctx.session.userInfo
  //services
  const res = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  if (!res) {
    //修改失败
    return new ErrorModel(changeInfoFailInfo)
  }
  //修改成功
  Object.assign(ctx.session.userInfo, { nickName, city, picture })
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo
}
