const { exec } = require('../db/mysql')

const login = async (username, password) => {
    const sql = `
        select username from user where username='${username}' and password='${password}';
    `
    const rows = await exec(sql)
    return rows[0] || {}
}

const regist = async (username, password) => {
    const sql = `
        insert into user (username, password) values ('${username}', '${password}');
    `
    const res = await exec(sql)
    return res
}

module.exports = {
    login,
    regist
}
