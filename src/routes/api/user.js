/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const genValidator = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const { isTest } = require('../../utils/env')
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const { getFollowers } = require('../../controller/user-relation')

router.prefix('/api/user')

//判断用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  //controller
  ctx.body = await isExist(userName)
})

//用户注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  //controller
  ctx.body = await register({ userName, password, gender })
})

//用户登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  //controller
  ctx.body = await login(ctx, { userName, password })
})

//删除用户
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    //测试环境下，测试账号登录之后，删除自己--避免测试数据污染数据库
    const { userName } = ctx.session.userInfo
    //controller
    ctx.body = await deleteCurUser(userName)
  }
})

//修改用户信息
router.patch(
  '/changeInfo',
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    //controller
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)
//修改密码
router.patch('/changePassword', async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  //controller
  ctx.body = await changePassword({ userName, password, newPassword })
})

//退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
  //controller
  ctx.body = await logout(ctx)
})

//获取@列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const res = await getFollowers(userId)
  const { followerList } = res.data
  const list = followerList.map(user => `${user.nickName}-${user.userName}`)
  //格式如：['昵称-userName']
  ctx.body = list
})
module.exports = router
