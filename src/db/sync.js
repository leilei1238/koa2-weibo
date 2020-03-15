/**
 * @description sequelize 同步model到数据库
 */
const seq = require('./seq')

require('./model') //在seq上定义了哪些schema

//同步model到mysql
seq
  .sync({ force: true })
  .then(() => {
    console.log('sync ok')
  })
  .catch(e => {
    console.log('sync error')
  })
