/**
 * @description user controller
 */

const doCrypto = require('../utils/cryp')
const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo
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

module.exports = {
  isExist,
  register
}