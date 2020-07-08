var express = require('express');
var router = express.Router();
const mysql = require("mysql");

const dbBase = (sql, data, callback) => {
    //定义链接数据库的参数值
    const connection = mysql.createConnection({
        // host: "106.12.85.17",
        // user: 'Mr.yang',
        // password: "Mr.0414",
        // database: "vuedemo"
        host: "localhost",
        user: 'root',
        password: "",
        database: "vuedemo"
    })
    connection.connect(() => {
        console.log("数据库连接成功");
    })
    connection.query(sql, data, (err, result) => {
        if (err) return console.log(err.message, "数据库请求数据出错");
        callback(null, result);
    })
    connection.end();
}
function connectMysql(sql, data, callback) {
    dbBase(sql, data, (err, results) => {
        if (err) return res.status(500).send("Server Error...");
        callback(results);
    })
}

router.get('/vuedemo/login', function (req, res, next) {
    connectMysql("select * from user", '', (results) => {
        res.json(results);
        res.end()
    })
})
router.get('/vuedemo/haha', function (req, res, next) {
    connectMysql("select * from user where name=?", '呸呸呸', (results) => {
        res.end()
        res.json(results);
    })
})

module.exports = router;