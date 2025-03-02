const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../db'); // 数据库连接
const router = express.Router();

/**
 * 登录
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: '用户名和密码不能为空' });

  connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: '数据库查询失败' });
    if (results.length === 0) return res.status(401).json({ message: '用户不存在' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '密码错误' });

    res.json({ message: '登录成功', user: { id: user.id, username: user.username, role: user.role } });
  });
});

/**
 * 注册（login 页面）
 */
router.post('/register', async (req, res) => {
  console.log("收到注册请求：", req.body);

  const { email, username, password, confirmPassword } = req.body;
  if (!email || !username || !password || !confirmPassword) {
    return res.status(400).json({ message: '所有字段都是必填项' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: '密码和确认密码不一致' });
  }

  connection.query('SELECT * FROM student_info WHERE email = ?', [email], (err, studentResults) => {
    if (err) {
      console.error("查询 student_info 失败：", err);
      return res.status(500).json({ message: '数据库查询错误' });
    }
    if (studentResults.length === 0) {
      return res.status(400).json({ message: '邮箱未登记，无法注册' });
    }

    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, userResults) => {
      if (err) {
        console.error("查询 users 失败：", err);
        return res.status(500).json({ message: '数据库查询错误' });
      }
      if (userResults.length > 0) {
        return res.status(400).json({ message: '该邮箱已注册' });
      }

      connection.query('SELECT * FROM users WHERE username = ?', [username], (err, existingUser) => {
        if (err) return res.status(500).json({ message: '数据库查询错误' });
        if (existingUser.length > 0) {
          return res.status(400).json({ message: '用户名已存在，请换一个' });
        }
      
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) return res.status(500).json({ message: '密码加密失败' });
      
          connection.query(
            'INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, 'customer', email],
            (err) => {
              if (err) return res.status(500).json({ message: '注册失败' });
              res.status(201).json({ message: '注册成功' });
            }
          );
        });
      });
    });      
  });
});

/**
 * 注册（accountmanage 页面 - 仅 Boss可新建用户）
 */
router.post("/create-user", async (req, res) => {
  const { email, username, password, role, creatorRole } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "请填写完整信息" });
  }

  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, userResults) => {
    if (err) {
      console.error("查询 users 失败：", err);
      return res.status(500).json({ message: '数据库查询错误' });
    }
    if (userResults.length > 0) {
      return res.status(400).json({ message: '该邮箱已注册' });
    }

    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, existingUser) => {
      if (err) return res.status(500).json({ message: '数据库查询错误' });
      if (existingUser.length > 0) {
        return res.status(400).json({ message: '用户名已存在，请换一个' });
      }
    
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: '密码加密失败' });
    
        connection.query(
          'INSERT INTO users (username, password, role, email) VALUES (?, ?, ?, ?)',
          [username, hashedPassword, 'customer', email],
          (err) => {
            if (err) return res.status(500).json({ message: '注册失败' });
            res.status(201).json({ message: '注册成功' });
          }
        );
      });
    });
  });
});

/**
 * 获取所有用户（accountmanage 页面）
 */
router.get('/', (req, res) => {
  connection.query('SELECT id, username, role, email FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: '数据库查询失败' });
    res.json(results);
  });
});

/**
 * 编辑用户
 */
router.put('/update/:id', async (req, res) => {
  const { username, password, role, editorRole } = req.body;
  const userId = req.params.id; // ✅ 直接从 URL 获取 id

  if (!editorRole) return res.status(403).json({ message: "无权限编辑用户" });
  if (editorRole !== "boss" && editorRole !== "admin") {
    return res.status(403).json({ message: "权限不足" });
  }
  if (editorRole === "admin" && role !== "customer") {
    return res.status(403).json({ message: "Admin 只能修改 Customer" });
  }

  // **✅ 先检查用户名是否已存在（但排除当前用户自己）**
  const checkQuery = "SELECT id FROM users WHERE username = ? AND id != ?";
  connection.query(checkQuery, [username, userId], async (err, results) => {
    if (err) return res.status(500).json({ message: "数据库错误" });

    if (results.length > 0) {
      return res.status(400).json({ message: "用户名已存在，请换一个" });
    }

    // **✅ 用户名可用，执行更新**
    let updateQuery = "UPDATE users SET username = ? WHERE id = ?";
    let values = [username, userId];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateQuery = "UPDATE users SET username = ?, password = ? WHERE id = ?";
      values = [username, hashedPassword, userId];
    }

    connection.query(updateQuery, values, (err) => {
      if (err) return res.status(500).json({ message: "数据库错误" });
      res.json({ message: "用户信息已更新" });
    });
  });
});

/**
 * 删除用户
 */
router.delete('/delete/:id', (req, res) => {
  const userId = req.params.id; // ✅ 直接从 URL 获取 id

  connection.query('DELETE FROM users WHERE id = ?', [userId], (err) => {
    if (err) return res.status(500).json({ message: '删除失败' });
    res.json({ message: '用户已删除' });
  });
});

module.exports = router;
