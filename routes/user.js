const router = require('koa-router')()

const {
    login,
    regist
} = require('../controller/user')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await login(username, password)
    if (data) {
        ctx.body = data
    } else {
        ctx.body = '未注册'
    }
})

router.post('/regist', async function (ctx, next) {
    const {username, password} = ctx.request.body
    const data = await regist(username, password)
    if (data) {
        ctx.body = '注册成功'
    } else {
        ctx.body = '未注册'
    }
})

module.exports = router