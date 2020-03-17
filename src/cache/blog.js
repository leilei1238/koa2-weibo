/**
 * @description 微博缓存层
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

//redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex
 * @param {number} pageSize
 */
const getSquareCacheList = async ({ pageIndex, pageSize }) => {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  //尝试获取缓存
  const cacheList = await get(key)
  if (cacheList != null) {
    //获取缓存成功
    return cacheList
  }
  //没有缓存，则读取数据库
  const res = await getBlogListByUser({ pageIndex, pageSize })
  set(key, res, 60)
  return res
}

module.exports = {
  getSquareCacheList
}
