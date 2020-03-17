/**
 * @description data-model 入口文件
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

//连表
Blog.belongsTo(User, {
  foreignKey: 'userId'
})

//连表：用户关系表与User表
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}
