/**
 * @description 用户关系 test
 */
const server = require('../server')
const { getFans, getFollowers } = require('../../src/controller/user-relation')
const {
  Z_ID,
  Z_COOKIE,
  Z_USER_NAME,
  L_ID,
  L_USER_NAME
} = require('../testUserInfo')

//先让张三取消关注李四(为了避免现在张三关注了李四)
test('无论如何，先取消关注，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  //不关心结果
  expect(1).toBe(1)
})

test('张三关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/follow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})

//获取粉丝
test('获取李四粉丝,应该有张三', async () => {
  const res = await getFans(L_ID)
  const { fansCount, fansList } = res.data
  const hasUserName = fansList.some(fanInfo => {
    return fanInfo.userName === Z_USER_NAME
  })
  expect(fansCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

//获取关注人
test('获取张三的关注人,应该有李四', async () => {
  const res = await getFollowers(Z_ID)
  const { followerCount, followerList } = res.data
  const hasUserName = followerList.some(fanInfo => {
    return fanInfo.userName === L_USER_NAME
  })
  expect(followerCount > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

//获取at列表
test('获取张三的at列表，应该有李四', async () => {
  const res = await server.get('/api/user/getAtList').set('cookie', Z_COOKIE)
  const hasUserName = res.body.some(
    fanInfo => fanInfo.indexOf(L_USER_NAME) !== -1
  )
  expect(hasUserName).toBe(true)
})

//取消关注
test('张三取消关注李四，应该成功', async () => {
  const res = await server
    .post('/api/profile/unFollow')
    .send({ userId: L_ID })
    .set('cookie', Z_COOKIE)
  //不关心结果
  expect(res.body.errno).toBe(0)
})
