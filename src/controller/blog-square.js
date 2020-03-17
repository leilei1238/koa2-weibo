/**
 * @description 微博广场 controller
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constant')
const {} = require('../model/ErrorInfo.js')

const getSquareBlogList = async ({ pageIndex = 0 }) => {
  //cache
  const { count, blogList } = await getSquareCacheList({
    pageIndex,
    pageSize: PAGE_SIZE
  })

  //拼接返回数据
  return new SuccessModel({
    count,
    pageSize: PAGE_SIZE,
    pageIndex,
    blogList,
    isEmpty: blogList.length === 0
  })
}

module.exports = {
  getSquareBlogList
}
