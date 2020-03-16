/**
 * @description blog-home controller
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
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

module.exports = {
  create
}
