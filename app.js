const path = require("path");
const bodyParser = require("body-parser")
const express = require("express");
const vuedemo = express();
const vuedemoRouter = require("./routes/vuedemo");
vuedemo.use(bodyParser.urlencoded({
    extended: false
}))
vuedemo.use(bodyParser.json())

vuedemo.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})
vuedemo.use('/public', express.static(path.join(__dirname, "./public")))
vuedemo.use('/node_modules/', express.static("./node_modules/"))

vuedemo.use(vuedemoRouter);
//设置运行的端口号。 远程访问的时候也是访问当前端口号
vuedemo.listen(1128, () => {
    console.log("server running at localhost:1128");
})