/**
 * @description 个人主页 API 路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const getBlogListString = require('../../utils/blog.js')

router.prefix('/api/profile')

//加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  let result = await getProfileBlogList(userName, pageIndex)
  //渲染为html字符串
  result.data.blogListTpl = getBlogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router
