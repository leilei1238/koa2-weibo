/**
 * @description data-model 入口文件
 */
const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

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
//连表：Blog与UserRelation 注：虽然sql表上看不出，但可以sequelize操作
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

//1对多的关系，一个BLOG可以有多个atRelation
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
}
