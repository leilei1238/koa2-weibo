/**
 * @description 微博at关系  controller
 */
const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
} = require('../services/atRelation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')
/**
 * 获取at我的微博数量
 * @param {number} userId
 */
const getAtMeCount = async userId => {
  //services
  const count = await getAtRelationCount(userId)
  return new SuccessModel({ count })
}

/**
 *
 * @param {Object} 获取at用户的微博列表 { userId, pageIndex }
 */
const getAtMeBlogList = async ({ userId, pageIndex }) => {
  const { count, blogList } = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  })
  //拼接返回数据
  return new SuccessModel({
    count,
    pageSize: PAGE_SIZE,
    pageIndex,
    blogList,
    isEmpty: blogList.length === 0
  })
}

/**
 * 标记为已读
 * @param {number} userId
 */
const markAsRead = async userId => {
  //services
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (ex) {
    console.error(ex.message, ex.stack)
  }
  //注：不需要返回任何结果，因为他在render后执行，前端接收不到
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}
