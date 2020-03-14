/**
 *@description 数据库配置文件
 */
const { isDev } = require('../utils/env')
let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}
let MYSQL_CONF = {
  host: 'localhost',
  port: '3306',
  database: 'koa2_weibo_db',
  user: 'root',
  password: '123456'
}

if (isDev) {
  //线上环境 redis配置
  REDIS_CONF = {
    host: '127.0.0.1',
    port: 6379
  }
  //线上环境 mysql配置
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    database: 'koa2_weibo_db',
    user: 'root',
    password: '123456'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
