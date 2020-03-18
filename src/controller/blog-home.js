/**
 * @description blog-home controller
 */

const {
  createBlog,
  deleteBlog,
  getBlogListByFollowers
} = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
const { PAGE_SIZE } = require('../conf/constant')
const xss = require('xss')

/**
 * 创建微博
 * @param {Object} 创建微博所需的数据 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
  //services
  try {
    const res = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(res)
  } catch (ex) {
    console.error(ex.message, err.stack)
    return new Error(createBlogFailInfo)
  }
}

/**
 * 删除测试微博
 * @param {number} id 微博ID
 */
const delBlog = async id => {
  const res = await deleteBlog(id)
  if (res) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteBlogFailInfo)
}

/**
 * 获取首页微博列表
 * @param {Object} 获取首页需要的参数 { userId, pageIndex = 0}
 */
const getHomeBlogList = async ({ userId, pageIndex = 0 }) => {
  //services
  const { count, blogList } = await getBlogListByFollowers({
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

module.exports = {
  create,
  delBlog,
  getHomeBlogList
}
