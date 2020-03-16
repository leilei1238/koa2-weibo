/**
 *@description utils api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks.js')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

//上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const fileObj = ctx.req.files && ctx.req.files['file']
  if (!fileObj) return
  const { size, path, name, type } = fileObj
  //controller
  ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router
