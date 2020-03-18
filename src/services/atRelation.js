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

/**
 * 获取at用户的微博列表
 * @param {Object} 查询条件 { userId, pageIndex, pageSize = 10 }
 */
const getAtUserBlogList = async ({ userId, pageIndex, pageSize = 10 }) => {
  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'city', 'picture', 'id']
      },
      {
        model: AtRelation,
        attributes: ['blogId', 'userId'],
        where: {
          userId
        }
      }
    ]
  })
  let blogList = res.rows.map(blog => blog.dataValues)
  blogList = formatBlog(blogList)
  blogList.forEach(item => {
    item.user = formatUser(item.user.dataValues)
  })
  return {
    count: res.count,
    blogList
  }
}

/**
 * 更新 AtRelation
 * @param {Object} 要更新的内容
 * @param {Object} userId 更新条件
 */
const updateAtRelation = async ({ newIsRead }, { userId, isRead }) => {
  //拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }

  //拼接查询条件
  const whereOpt = {}
  if (userId) {
    Object.assign(whereOpt, { userId })
  }
  //执行更新
  const res = await AtRelation.update(updateData, {
    where: whereOpt
  })
  return res[0] > 0
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}
