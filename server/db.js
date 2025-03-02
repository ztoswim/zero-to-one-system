// db.js
const mysql = require('mysql2');

// 创建连接对象
const connection = mysql.createConnection({
  host: 'localhost',     // 数据库服务器地址，通常是 localhost
  user: 'root', // 数据库用户名（例如 root 或你创建的其他用户）
  password: 'Perfect247965', // 数据库密码
  database: 'mydb'  // 你要连接的数据库名称，比如 mydb
});

// 连接数据库
connection.connect((err) => {
  if (err) {
    console.error("数据库连接失败", err);
  } else {
    console.log("数据库连接成功");
  }
});

module.exports = connection;
