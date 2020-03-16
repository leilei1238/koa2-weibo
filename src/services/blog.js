/**
 * @description blog services
 */

const { Blog, User } = require('../db/model')
const { formatUser } = require('./_format.js')

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
  const blogList = res.rows.map(blog => blog.dataValues)
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

module.exports = {
  createBlog,
  getBlogListByUser,
  deleteBlog
}
