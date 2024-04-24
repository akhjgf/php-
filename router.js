var url = require('url');
var path = require('path');
var fs = require('fs');
var model = require("./model")
var _ = require("underscore")

var formidable = require("formidable")
module.exports = function (req, res) {
    var urlObj = url.parse(req.url)
    var pathname = urlObj.pathname
    var method = req.method.toLowerCase()
    // 展示首页
    if (pathname == '/' && method == 'get') {
        fs.readFile(path.join(__dirname, 'views/index.html'), function (err, data) {
            if (err) {
                return res.end(err.message)
            }
            model.findProduct(function (err, results) {
                // 接受到以数组-(数组(不同的查询结果)>对象形式)的数据类型序列 
                // console.log(results);
                if (err) { console.error(err); return }
                var compiled = _.template(data.toString());
                var htmlStr = compiled({
                    computerList: results[0],
                    phoneList: results[1],
                    padList: results[2],
                    earphoneList: results[3],
                    productList: results[4],
                })
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(htmlStr);
            })
            // res.end(data)
        })
    } else if
        ((pathname.startsWith('/public/') && method == 'get') || (pathname.startsWith('/node_modules/')
            && method == ' get')) {
        fs.readFile(path.join(__dirname,pathname), function (err, data) {
            if (err) {
                return res.end(err.message)
            }
            res.end(data)
        })
    } else if (pathname.startsWith('/login') && method == 'get') {
        fs.readFile(path.join(__dirname, 'views/login.html'), function (err, data) {
            if (err) {
                return res.end(err.message)
            }
            res.end(data)
        })
    } else if (pathname.startsWith('/login') && method == 'post') {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fileds, files) {
            if (err) { return res.end(err.message) }
            var phone = fileds.phone
            var password = fileds.password
            // 测试数据
            // console.log(phone + "——" + password)
            model.findPhone(phone, function (err, results) {
                // 接受到以数组-(数组(不同的查询结果)>对象形式)的数据类型序列 
                // console.log(results);
                if (err) { console.error(err); return }
                console.log(results)
                if (results.length == 0) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
                    res.end("<script>alert('电话号码未注册');window.location.href='/login'</script>");
                } else {
                    if (results[0].password != password) {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
                        res.end("<script>alert('密码不正确，请重新输入！');window.location.href='/login'</script>");
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
                        res.end("<script>window.sessionStorage.setItem('phone',"+phone+"); alert('登录成功！');window.location.href='/'</script>");
                    }
                }
            })
        })
    } else if (pathname.startsWith('/register') && method == 'get') {
        fs.readFile(path.join(__dirname, 'views/register.html'), function (err, data) {
            if (err) {
                return res.end(err.message)
            }
            res.end(data)
        })
    } else if (pathname.startsWith('/register') && method == 'post') {
        var form = new formidable.IncomingForm()
        form.parse(req, function (err, fileds, files) {
            if (err) { return res.end(err.message) }
            var phone = fileds.phone
            var password = fileds.password
            var nickname = fileds.nickname
            // 测试数据
            //打印结果：电话： 135H112222 ；用户名：哈哈；密码： 123456
            // console.log('电话：' + phone + ' ；用户名：' + nickname + ' 密码：' + password)
            // 检测电话唯一
            model.findPhone(phone, function (err, results) {
                // 接受到以数组-(数组(不同的查询结果)>对象形式)的数据类型序列 
                // console.log(results);
                if (err) { console.error(err); return res.end(err) }
                if (results.length == 0) {
                    // 提交
                    model.doReg(phone, nickname, password, function (err, results2) {
                        if (err) { console.error(err); return res.end(err) }
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
                        res.end("<script>alert('注册成功，前去登录！');window.location.href='/login'</script>");
                    })
                    return
                }
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
                res.end("<script>alert('此电话号码已经注册了，请重新输入！');window.location.href='/register'</script>");
                // endPhone
            })
            // endParse
        })
    }
}

