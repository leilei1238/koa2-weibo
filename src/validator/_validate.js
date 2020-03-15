/**
 *@description json schema 校验
 */
const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * json schema 校验
 * @param {Object}} json schema 规则
 * @param {Object} data 待校验的数据
 */
const validate = (schema, data = {}) => {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
