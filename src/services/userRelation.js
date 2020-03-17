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
/**
 * 获取该用户关注的用户列表
 * @param {number} userId 关注人的id
 */
const getFollowersByUsers = async userId => {
  const res = await UserRelation.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId
    }
  })
  //result.count:关注该用户的list总数/ result.rows.userList 粉丝list
  let userList = res.rows.map(row => row.dataValues)
  userList = userList.map(item => {
    item.user = formatUser(item.user.dataValues)
    return item.user
  })
  return {
    count: res.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} followerId  要被关注的用户
 * @param {number} userId 当前登录的用户
 */
const addFollower = async ({ followerId, userId }) => {
  const res = await UserRelation.create({
    followerId,
    userId
  })
  return res.dataValues
}

/**
 *删除关注关系
 * @param {number} followerId 要被关注的用户
 * @param {number} userId 当前登录的用户
 */
const deleteFollower = async ({ followerId, userId }) => {
  const res = await UserRelation.destroy({
    where: {
      followerId,
      userId
    }
  })
  //res 是删除的行数
  return res > 0
}

module.exports = {
  getUsersByFollower,
  getFollowersByUsers,
  addFollower,
  deleteFollower
}
