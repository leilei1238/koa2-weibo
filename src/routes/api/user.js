/**
 * @description user API 路由
 */

const router = require('koa-router')()
const genValidator = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginChecks')
const userValidate = require('../../validator/user')
const { isTest } = require('../../utils/env')
const {
  isExist,
  register,
  login,
  deleteCurUser
} = require('../../controller/user')

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

//删除用户
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    //测试环境下，测试账号登录之后，删除自己--避免测试数据污染数据库
    const { userName } = ctx.session.userInfo
    //controller
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router
