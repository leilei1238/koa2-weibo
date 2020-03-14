/**
 * @description jest server
 */

const request = require('supertest')
const server = require('../src/app').callback() //用此回调函数将koa应用程序挂载到express应用程序中

module.exports = request(server)
