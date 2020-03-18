/**
 * @description 首页API路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const genValidator = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const {
  create,
  delBlog,
  getHomeBlogList
} = require('../../controller/blog-home')
const { isTest } = require('../../utils/env')
const getBlogListString = require('../../utils/blog.js')

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

//加载更多
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  let { pageIndex } = ctx.params

  pageIndex = parseInt(pageIndex)
  const result = await getHomeBlogList({ userId, pageIndex })

  //渲染为模板字符串
  result.data.blogListTpl = getBlogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router
