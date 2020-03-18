/**
 * @description 微博at关系  controller
 */
const { getAtRelationCount } = require('../services/atRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
/**
 * 获取at我的微博数量
 * @param {number} userId
 */
const getAtMeCount = async userId => {
  //services
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

module.exports = {
  getAtMeCount
}
