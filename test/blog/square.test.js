/**
 * @description 广场页 test
 */
const server = require('../server')
const { COOKIE, USER_NAME } = require('../testUserInfo')

//测试广场页加载更多 第一页
test('测试广场页第一页，应该成功', async () => {
  const res = await server.get(`/api/square/loadMore/0`).set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data).toHaveProperty('count')
  expect(res.body.data).toHaveProperty('pageSize')
  expect(res.body.data).toHaveProperty('pageIndex')
  expect(res.body.data).toHaveProperty('blogList')
  expect(res.body.data).toHaveProperty('isEmpty')
})
