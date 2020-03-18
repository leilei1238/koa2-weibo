/**
 * @description atRelation services
 */
const { Blog, AtRelation } = require('../db/model')
const { formatUser, formatBlog } = require('./_format.js')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博ID
 * @param {number} userId 用户ID
 */
const createAtRelation = async (blogId, userId) => {
  const res = await AtRelation.create({
    blogId,
    userId
  })
  return res.dataValues
}

/**
 * 获取 @用户 的微博数量 (未读的)
 * @param {number} userId
 */
const getAtRelationCount = async userId => {
  const res = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return res.count
}

module.exports = {
  createAtRelation,
  getAtRelationCount
}
