const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaStatic = require('koa-static')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { isProd } = require('./utils/env')

//路由
const index = require('./routes/index')
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user.js')
const userApiRouter = require('./routes/api/user')

// error handler：页面显示
let onerrorConf = {}
if (isProd) {
  onerrorConf = { redirect: '/error' }
}
onerror(app, onerrorConf)

//session 配置
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const { REDIS_CONF } = require('./conf/db')
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: 'weibo.sid', //cookie name默认是'koa.sid'
    prefix: 'weibo:sess:', //redis key的前缀，默认"koa:sess:"
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 //单位ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// routes
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())

app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) //它一定放路由最后

// error-handling:打印到控制台
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
