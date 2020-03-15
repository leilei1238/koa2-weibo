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
  const { size, path, name, type } = ctx.req.files['file']
  //controller
  ctx.body = await saveFile({ size, filePath: path, name, type })
})

module.exports = router
