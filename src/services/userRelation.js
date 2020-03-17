/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/model')
const { formatUser } = require('../services/_format')
/**
 * 获取关注该用户的用户列表，即该用户的粉丝
 * @param {number} followerId 被关注人的id
 */
const getUsersByFollower = async followerId => {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  //result.count:关注该用户的list总数/ result.rows.userList 粉丝list
  const userList = res.rows.map(user => formatUser(user.dataValues))
  return {
    count: res.count,
    userList
  }
}

module.exports = {
  getUsersByFollower
}
