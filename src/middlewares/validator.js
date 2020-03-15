/**
 * @description 中间件：用户数据json schema校验
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成json schema 验证的中间件
 * @param {Function} validateFn 验证函数
 */
const genValidator = validateFn => {
  return async (ctx, next) => {
    //要校验的数据
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      //验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    //验证成功 继续
    await next()
  }
}

module.exports = genValidator
