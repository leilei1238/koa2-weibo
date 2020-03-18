/**
 * @description blog services
 */

const { Blog, User, UserRelation } = require('../db/model')
const { formatUser, formatBlog } = require('./_format.js')

/**
 * 创建微博
 * @param {Object} 创建微博需要的参数 { userId, content, image }
 */
const createBlog = async ({ userId, content, image }) => {
  const res = await Blog.create({
    userId,
    content,
    image
  })
  if (res == null) {
    return res
  }
  return res.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {string} userName
 * @param {number} pageIndex
 * @param {number} pageSize
 */
const getBlogListByUser = async ({
  userName,
  pageIndex = 0,
  pageSize = 10
}) => {
  //拼接查询条件
  let userWhereOpt = {}
  if (userName) {
    Object.assign(userWhereOpt, { userName })
  }
  const res = await Blog.findAndCountAll({
    limit: pageSize, //每页条数
    offset: pageSize * pageIndex, //跳过的条数
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpt
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

const deleteBlog = async id => {
  const res = await Blog.destroy({
    where: { id }
  })
  return res > 0
}

/**
 * 获取关注者的微博 三表查询 uid->fid->fids的blog
 * @param {Object} 获取首页微博的参数 { userId, pageIndex=0, pageSize=10}
 */
const getBlogListByFollowers = async ({
  userId,
  pageIndex = 0,
  pageSize = 10
}) => {
  const res = await Blog.findAndCountAll({
    limit: pageSize, //每页多少条
    offset: pageSize * pageIndex, //跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        //连User：知道每天微博创建人的info
        model: User,
        attributes: ['userName', 'nickName', 'city', 'picture', 'id']
      },
      {
        //连UserRL：知道followerId,然后知道followerID的blog和userInfo
        model: UserRelation,
        attributes: ['followerId', 'userId'],
        where: { userId }
      }
    ]
  })

  let blogList = res.rows.map(blog => blog.dataValues)
  blogList = formatBlog(blogList)
  blogList.forEach(item => {
    item.user = formatUser(item.user.dataValues)
  })
  console.log(blogList)
  return {
    count: res.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  deleteBlog,
  getBlogListByFollowers
}
