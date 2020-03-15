/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { isExist, register, login } = require('../../controller/user')
const genValidator = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

//判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  //controller
  ctx.body = await isExist(userName)
})

//用户注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  //controller
  ctx.body = await register({ userName, password, gender })
})

//用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  //controller
  ctx.body = await login(ctx, { userName, password })
})
module.exports = router
