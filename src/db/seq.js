/**
 * @description sequelize 实例
 */
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isDev, isTest } = require('../utils/env')
const { database, user, password } = MYSQL_CONF

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}
//线上环境：使用连接池
if (isDev) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000 //如果一个连接池 10s没被使用，就释放
  }
}
//单元测试时，不让sql打印sql语句
if (isTest) {
  config.logging = () => {}
}
//创建实例
const seq = new Sequelize(database, user, password, conf)

module.exports = seq
