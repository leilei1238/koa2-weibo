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
//连表：Blog与UserRelation 注：虽然sql表上看不出，但可以sequelize操作
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}
