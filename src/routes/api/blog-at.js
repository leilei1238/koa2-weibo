/**
 * @description blog-at API 路由
 */

const router = require('koa-router')()
const { getAtMeBlogList } = require('../../controller/blog-at')
const getBlogListString = require('../../utils/blog.js')

router.prefix('/api/atMe')

//加载更多
router.get('/loadMore/:pageIndex', async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  let { pageIndex } = ctx.params

  pageIndex = parseInt(pageIndex)
  const result = await getAtMeBlogList({ userId, pageIndex })

  //渲染为模板字符串
  result.data.blogListTpl = getBlogListString(result.data.blogList)
  ctx.body = result
})

module.exports = router
