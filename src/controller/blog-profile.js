/**
 * @description 个人主页 controller
 */
const { getBlogListByUser } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {} = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')
/**
 * 获取个人主页列表
 * @param {string} userName
 * @param {number} pageIndex
 */
const getProfileBlogList = async (userName, pageIndex = 0) => {
  //services
  const { count, blogList } = await getBlogListByUser({
    userName,
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

module.exports = {
  getProfileBlogList
}
