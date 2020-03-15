/**
 * @description 加密方法
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5加密
 * @param {string} content 明文
 */
const _md5 = content => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') //hex 16进制
}

/**
 * 加密
 * @param {string} content 明文
 */
const doCrypto = content => {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
