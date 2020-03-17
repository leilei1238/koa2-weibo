/**
 * @description 个人主页 API 路由
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow, unFollow } = require('../../controller/user-relation')
const getBlogListString = require('../../utils/blog.js')

router.prefix('/api/profile')

//加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  let result = await getProfileBlogList({ userName, pageIndex })
  //渲染为html字符串
  result.data.blogListTpl = getBlogListString(result.data.blogList)
  ctx.body = result
})
//关注
router.post('/follow', loginCheck, async (ctx, next) => {
  let { id: myUserId } = ctx.session.userInfo //当前登录的用户
  let { userId: curUserId } = ctx.request.body //要被关注的用户
  //controller
  ctx.body = await follow({ curUserId, myUserId })
})

//取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  let { id: myUserId } = ctx.session.userInfo //当前登录的用户
  let { userId: curUserId } = ctx.request.body //要被关注的用户
  //controller
  ctx.body = await unFollow({ curUserId, myUserId })
})

module.exports = router
