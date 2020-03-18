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
const { REG_FO_AT_WHO } = require('../conf/constant')
const xss = require('xss')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/atRelation')

/**
 * 创建微博
 * @param {Object} 创建微博所需的数据 { userId, content, image }
 */
const create = async ({ userId, content, image }) => {
  //分析并收集 content中的@用户
  //content格式如：'哈喽 @李四-lisi 你好 @王五-wangwu'
  let atUserNameList = []
  content = content.replace(REG_FO_AT_WHO, (matchStr, nickName, userName) => {
    //目的是保存userName，而不是replace
    atUserNameList.push(userName)
    return matchStr
  })
  //按userName查询用户信息,拿到用户ID
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )
  //根据用户信息，获取用户id
  const atUserIdList = atUserList.map(userInfo => userInfo.id)

  try {
    //创建微博
    const blog = await createBlog({ userId, content: xss(content), image })

    //创建@关系
    const atRes = await Promise.all(
      atUserIdList.map(userId => createAtRelation(blog.id, userId))
    )
    //返回
    return new SuccessModel(blog)
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
