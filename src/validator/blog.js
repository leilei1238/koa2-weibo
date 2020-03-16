/**
 * @description blog schema 校验
 */
const validate = require('./_validate')
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      minLength: 2
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}
//校验微博数据格式
module.exports = (data = {}) => {
  return validate(SCHEMA, data)
}
