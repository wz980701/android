const router = require('koa-router')()

const {
    login,
    regist
} = require('../controller/user')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await login(username, password)
    if (data && JSON.stringify(data) !== '{}') {
        ctx.body = {
            code: 1,
            data
        }
    } else {
        ctx.body = {
            code: 0,
            message: '登录错误'
        }
    }
})

router.post('/regist', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await regist(username, password)
    if (data) {
        ctx.body = {
            code: 1,
            message: '注册成功'
        }
    } else {
        ctx.body = {
            code: 0,
            message: '注册失败'
        }
    }
})

module.exports = router