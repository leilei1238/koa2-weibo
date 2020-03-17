/**
 * @description 用户关系 controller
 */

const { getUsersByFollower } = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 根据userId获取粉丝列表
 * @param {number} userId
 */
const getFans = async userId => {
  //services
  const { count: fansCount, userList: fansList } = await getUsersByFollower(
    userId
  )
  return new SuccessModel({
    fansCount,
    fansList
  })
}

module.exports = {
  getFans
}
