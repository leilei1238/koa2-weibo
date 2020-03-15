/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameExistInfo } = require('../model/ErrorInfo')
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
  return new ErrorModel(registerUserNameExistInfo)
}

module.exports = {
  isExist
}
