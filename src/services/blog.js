/**
 * @description blog services
 */

const { Blog } = require('../db/model')

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

module.exports = {
  createBlog
}
