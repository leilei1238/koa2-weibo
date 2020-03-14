/**
 *@description 数据库配置文件
 */
const { isDev } = require('../utils/env')
let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

if (isDev) {
  REDIS_CONF = {
    //线上环境 redis配置
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  REDIS_CONF
}
