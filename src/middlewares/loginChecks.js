/**
 * @description 中间件：登录验证
 */
const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API登录验证
 * @param {Object} ctx
 * @param {function} next
 */
const loginCheck = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录验证
 * @param {Object}} ctx
 * @param {function} next
 */
const loginRedirect = async (ctx, next) => {
  if (ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  //未登录，跳转登录页面，登录后继续返回当前页
  ctx.redirect(`/login?url=${encodeURIComponent(ctx.url)}`)
}

module.exports = {
  loginCheck,
  loginRedirect
}
