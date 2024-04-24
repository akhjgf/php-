// 连接数据库
var mysql = require('mysql')
var config = require('./config')
// 创建连接池
var pool = mysql.createPool({
  connectionLimit: 100,//最大连接数
  multipleStatements: true,//允许多语句查询
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
})

//查找所有商品以及按照商品类别查找商品
module.exports.findProduct = function (callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback("连接池连接失败!" + err);
    }

    var sql = `
      select * FROM go_product WHERE p_type = 'ad-product-computer' LIMIT 4;
      select * FROM go_product WHERE p_type = 'ad-product-phone' LIMIT 4;
      select * FROM go_product WHERE p_type = 'ad-product-pad' LIMIT 4;
      select * FROM go_product WHERE p_type = 'ad-product-ear' LIMIT 4;
      select * FROM go_product ;
    `

    conn.query(sql, function (err, results) {
      conn.release();
      if (err) {
        return callback("查询失败!" + err, null);
      }
      callback(null, results);
    });
  });
};
module.exports.findPhone = function (phone, callback) {

  pool.getConnection(function (err, conn) {
    if (err) {
      return callback("连接池连接失败!" + err, null);
    }
    var sql = "SELECT * FROM user_info WHERE phone = ?";
    conn.query(sql, [phone], function (err, results) {
      conn.release();
      if (err) {
        return callback("查询失败!" + err, null);
      }
      callback(null, results);
    });
  });
}
// 注册:将信息存储到数据表中
module.exports.doReg = function (phone, nickname, password, callback) {
  // 使用连接池获取数据库连接
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback("连接池连接失败!" + err,null);
    }

    var sql = 'INSERT INTO user_info(u_id, phone, nickname, password) VALUES (null, ?, ?, ?)';
    conn.query(sql, [phone, nickname, password], function (err, results) {
      conn.release();
      if (err) {
        return callback("查询失败!" + err);
      }
      callback(null, results);
    });
  });
};

