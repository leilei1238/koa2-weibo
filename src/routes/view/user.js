/**
 * @description user view路由
 */

const router = require('koa-router')()

//登录页面
router.get('/login', async (ctx, next) => {
  await ctx.render('login')
})

//注册页面
router.get('/register', async (ctx, next) => {
  await ctx.render('register')
})
module.exports = router
