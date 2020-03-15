/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')
const genValidator = require('../../middlewares/validator')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

//判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  //controller
  ctx.body = await isExist(userName)
})

//注册用户
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  //controller
  ctx.body = await register({ userName, password, gender })
})

module.exports = router
