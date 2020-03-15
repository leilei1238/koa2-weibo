/**
 * @description user view路由
 */

const router = require('koa-router')()

const getLoginInfo = ctx => {
  let data = {
    isLogin: false
  }

  let userInfo = ctx.session.userInfo

  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}
//登录页面
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

//注册页面
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})
module.exports = router
