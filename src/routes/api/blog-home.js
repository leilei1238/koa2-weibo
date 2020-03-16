/**
 * @description 首页API路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

//创建微博
router.post(
  '/create',
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    //controller
    ctx.body = await create({ userId, content, image })
  }
)

module.exports = router
