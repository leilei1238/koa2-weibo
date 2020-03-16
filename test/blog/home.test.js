/**
 * @description 首页 API test
 */
const server = require('../server')
const { COOKIE } = require('../testUserInfo')

//存储微博id
let BLOG_ID = ''

//测试 创建一条微博
test('创建一条微博,应该成功', async () => {
  const content = `单元测试自动创建的微博_${Date.now()}`
  const image = '/test.png'
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  //记录微博id
  BLOG_ID = res.body.data.id
})

//删除测试微博
test('删除污染数据库的测试微博,应该成功', async () => {
  const res = await server
    .post('/api/blog/delBlog')
    .send({ id: BLOG_ID })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})
