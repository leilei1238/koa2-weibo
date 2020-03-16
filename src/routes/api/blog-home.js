/**
 * @description 首页API路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { create, delBlog } = require('../../controller/blog-home')
const { isTest } = require('../../utils/env')

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
//删除微博：仅在test环境下删除
router.post('/delBlog', loginCheck, async (ctx, next) => {
  if (isTest) {
    const { id } = ctx.request.body
    //controller
    ctx.body = await delBlog(id)
  }
})

module.exports = router
