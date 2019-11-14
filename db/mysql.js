const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/default')

const con = mysql.createConnection({
    host: '47.103.12.86',
    user: 'root',
    password: '138290Wz..0',
    database: 'blog_android'
})  // 创建连接

con.connect()   // 开始连接

//执行mysql语句函数
function exec (sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}