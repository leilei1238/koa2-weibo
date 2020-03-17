/**
 * @description 个人主页 test
 */
const server = require('../server')
const { Z_COOKIE, Z_USER_NAME } = require('../testUserInfo')

//测试个人主页加载更多 第一页
test('测试个人主页第一页，应该成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${Z_USER_NAME}/0`)
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data).toHaveProperty('count')
  expect(res.body.data).toHaveProperty('pageSize')
  expect(res.body.data).toHaveProperty('pageIndex')
  expect(res.body.data).toHaveProperty('blogList')
  expect(res.body.data).toHaveProperty('isEmpty')
})
