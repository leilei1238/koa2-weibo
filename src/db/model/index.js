/**
 * @description data-model 入口文件
 */
const User = require('./User')
const Blog = require('./Blog')

//连表
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
