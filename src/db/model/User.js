/**
 * @description User model
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comments: '用户名,唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comments: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comments: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comments: '性别(1男性，2女性，3保密)'
  },
  picture: {
    type: STRING,
    comments: '头像,图片地址'
  },
  city: {
    type: STRING,
    allowNull: false,
    comments: '昵称'
  }
})

module.exports = User
