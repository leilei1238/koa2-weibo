/**
 * @description 微博@数据关系 model
 */
const seq = require('../seq')
const { BOOLEAN, INTEGER } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, //默认未读
    comment: '是否已读'
  }
})

module.exports = AtRelation
