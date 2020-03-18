/**
 * @description atRelation services
 */
const { Blog, User, AtRelation } = require('../db/model')
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

module.exports = {
  createAtRelation
}
