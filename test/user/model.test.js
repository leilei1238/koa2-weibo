/**
 * @description user model test
 */
const { User } = require('../../src/db/model')

test('User 模型的各个属性,符合预期', () => {
  //build会构建一个内存user实例，但不会提交到数据库中
  const user = User.build({
    userName: 'zhangsan',
    password: 'p123',
    nickName: '张三',
    // gender: 3,
    picture: '/xx.png',
    city: '北京'
  })
  //验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('p123')
  expect(user.nickName).toBe('张三')
  expect(user.gender).toBe(3) //测试gender默认值
  expect(user.picture).toBe('/xx.png')
  expect(user.city).toBe('北京')
})
