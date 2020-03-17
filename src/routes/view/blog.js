/**
 * @description blog view路由
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')
const { isExist } = require('../../controller/user')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

//个人主页
router.get('/profile', async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  //已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const userName = myUserInfo.userName

  let curUserInfo = null
  const { userName: curUserName } = ctx.params
  const isMe = curUserName === userName

  if (isMe) {
    //是当前登录用户,直接用session的用户信息
    curUserInfo = myUserInfo
  } else {
    //不是当前登录用户，再根据用户名获取当前用户信息
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      //用户名不存在
      return
    }
    curUserInfo = existResult.data
  }
  //获取微博第一页数据
  const result = await getProfileBlogList({
    userName: curUserName,
    pageIndex: 0
  })
  const { count, pageSize, pageIndex, blogList, isEmpty } = result.data

  //获取粉丝
  //controller
  const fansRes = await getFans(curUserInfo.id)
  const { fansCount, fansList } = fansRes.data

  await ctx.render('profile', {
    blogData: { count, pageSize, pageIndex, blogList, isEmpty },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      }
    }
  })
})
//微博广场第一页
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList({ pageIndex: 0 })
  const { count, pageSize, pageIndex, blogList, isEmpty } = result.data
  await ctx.render('square', {
    blogData: { count, pageSize, pageIndex, blogList, isEmpty }
  })
})

module.exports = router
