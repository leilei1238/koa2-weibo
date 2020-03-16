/**
 * @description blog model test
 */
const { Blog } = require('../../src/db/model')

test('Blog 模型的各个属性，符合预期', () => {
  //build构建一个实例，但不会提交到数据库中
  const blog = Blog.build({
    userId: 1,
    content: '微博内容测试',
    image: '/test.png'
  })

  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('微博内容测试')
  expect(blog.image).toBe('/test.png')
})
