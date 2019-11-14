const { exec } = require('../db/mysql')

const getList = async (author) => {
    let sql = `select id,author,title from blog where 1=1 `
    if (author) {
        sql += `and author=${author}`
    }
    sql += `order by createtime desc;`
    return await exec(sql)
}

const getDetail = async (id) => {
    const sql = `
        select * from blog where id=${id};
    `
    const data = await exec(sql);
    return data[0]
}

const addBlog = async (username, title, content) => {
    const sql = `
        insert into blog (author, title, content, createtime) values
        ('${username}', '${title}', '${content}', '${_timeToTimestamp()}');
    `
    return await exec(sql)
}

const like = async (id, username, author, title) => {
    const sql = `
        select * from blog_like where username='${username}' and blog_id=${id};
    `
    const data = await exec(sql)
    if (data.length > 0) {
        return false
    }
    const sql1 = `
        update blog set blog.like=blog.like + 1 where id = ${id};
    `
    const sql2 = `
        insert into blog_like (username, blog_id, author, title) values
        ('${username}', ${id}, '${author}', '${title}');
    `
    const data1 = await exec(sql1)
    const data2 = await exec(sql2)
    return data1 && data2
}

const likeList = async (username) => {
    const sql = `
        select * from blog_like where username='${username}';
    `
    return await exec(sql)
}

const _timeToTimestamp = () => {    // 当前时间转化成时间戳
    const timestamp = Math.round(new Date().getTime()/1000).toString()
    return timestamp
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    like,
    likeList
}
