/**
 * @description 微博数据相关的工具方法
 */

const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

//获取blog.ejs的内容
const filePath = path.join(__dirname, '..', 'views/widgets', 'blog-list.ejs')
const BLOG_LIST_TPL = fs.readFileSync(filePath).toString()

/**
 * 根据blogList渲染出字符串
 * @param {Array} blogList
 * @param {Boolean} canReply
 */
const getBlogListString = (blogList = [], canReply = false) => {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = getBlogListString
