/**
 * @description 微博 @关系 test
 */
const server = require('../server')
const {
  Z_ID,
  Z_COOKIE,
  Z_USER_NAME,
  L_ID,
  L_COOKIE,
  L_USER_NAME
} = require('../testUserInfo')

let BLOG_ID = ''

test('张三创建一条微博，@李四,应该成功', async () => {
  const content = `单元测试自动创建的微博_${Date.now()}@李四-${L_USER_NAME} `
  const res = await server
    .post('/api/blog/create')
    .send({ content })
    .set('cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)
  //记录 微博id
  BLOG_ID = res.body.data.id
})

test('获取李四的  @列表(第一页)，应该有刚刚创建的微博', async () => {
  // 所有的列表倒序排列,应该包含刚刚创建的微博
  const res = await server.get(`/api/atMe/loadMore/0`).set('cookie', L_COOKIE)

  expect(res.body.errno).toBe(0)
  const { blogList } = res.body.data
  const isHaveCurBlog = blogList.some(blog => blog.id === BLOG_ID)

  expect(isHaveCurBlog).toBe(true)
})

//删除测试微博
test('删除污染数据库的测试微博,应该成功', async () => {
  const res = await server
    .post('/api/blog/delBlog')
    .send({ id: BLOG_ID })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
})
