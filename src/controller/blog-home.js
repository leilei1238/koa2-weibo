/**
 * @description blog-home controller
 */

const { createBlog, deleteBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo, deleteBlogFailInfo } = require('../model/ErrorInfo')
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

module.exports = {
  create,
  delBlog
}
