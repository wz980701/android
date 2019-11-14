const router = require('koa-router')()

const {
    getList,
    getDetail,
    addBlog,
    like,
    likeList
} = require('../controller/blog')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const author = ctx.query.author || ''
    const listData = await getList(author)
    if (listData) {
        ctx.body = {
            code: 1,
            listData
        }
    } else {
        ctx.body = {
            code: 0,
            message: '获取博客列表失败'
        }
    }
})

router.get('/detail', async function (ctx, next) {
    const id = ctx.query.id
    const data = await getDetail(id)
    if (data && JSON.stringify(data) !== '{}') {
        ctx.body = {
            code: 1,
            data
        }
    } else {
        ctx.body = {
            code: 0,
            message: '获取详情失败'
        }
    }
})

router.post('/add', async function (ctx, next) {
    const {username, title, content} = ctx.request.body
    const data = await addBlog(username, title, content)
    if (data) {
        ctx.body = {
            code: 1,
            message: '添加博客成功'
        }
    } else {
        ctx.body = {
            code: 0,
            message:'添加博客失败'
        }
    }
})

router.post('/like', async function (ctx, next) {
    const {id, username, author, title} = ctx.request.body
    const data = await like(id, username, author, title)
    if (data) {
        ctx.body = {
            code: 1,
            message: '收藏博客成功'
        }
    } else {
        ctx.body = {
            code: 0,
            message: '收藏博客失败'
        }
    }
})

router.get('/likeList', async function (ctx, next) {
    const username = ctx.query.username
    const data = await likeList(username)
    if (data) {
        ctx.body = {
            code: 1,
            data
        }
    } else {
        ctx.body = {
            code: 0,
            message: '获取收藏博客失败'
        }
    }
})

module.exports = router