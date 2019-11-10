const env = process.env.NODE_ENV    // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'blog-android'
    }
}

module.exports = {
    MYSQL_CONF
}