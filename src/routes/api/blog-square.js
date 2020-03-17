/**
 * @description 微博广场 API路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const getBlogListString = require('../../utils/blog.js')

router.prefix('/api/square')

//加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  let result = await getSquareBlogList({ pageIndex })
  //渲染为html字符串
  result.data.blogListTpl = getBlogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router
