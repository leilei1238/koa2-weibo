/**
 * @description 用户关系 controller
 */

const {
  getUsersByFollower,
  addFollower,
  deleteFollower
} = require('../services/userRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo
} = require('../model/ErrorInfo.js')
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

/**
 * 关注
 * @param {number} curUserId  要被关注的用户
 * @param {number} myUserId  当前登录的用户
 */
const follow = async ({ curUserId, myUserId }) => {
  //services
  try {
    await addFollower({ followerId: curUserId, userId: myUserId })
    return new SuccessModel()
  } catch (ex) {
    console.log(ex.message, ex.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} curUserId 要被关注的用户
 * @param {number} myUserId 当前登录用户
 */
const unFollow = async ({ curUserId, myUserId }) => {
  //services
  const res = await deleteFollower({ followerId: curUserId, userId: myUserId })
  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unFollow
}
