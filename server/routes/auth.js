const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../services/db');
const auth = require('../middleware/auth');

const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
    }

    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ success: false, message: '用户名长度需要3-20个字符' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: '密码长度至少6个字符' });
    }

    // 检查用户名是否已存在
    const existing = db.findOne('users.json', u => u.username === username);
    if (existing) {
      return res.status(400).json({ success: false, message: '用户名已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.insertOne('users.json', user);

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: '注册成功',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error('注册错误:', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
    }

    const user = db.findOne('users.json', u => u.username === username);
    if (!user) {
      return res.status(400).json({ success: false, message: '用户名或密码错误' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ success: false, message: '用户名或密码错误' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: '登录成功',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ success: false, message: '服务器内部错误' });
  }
});

// 获取当前用户信息
router.get('/me', auth, (req, res) => {
  const user = db.findOne('users.json', u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: '用户不存在' });
  }
  res.json({ success: true, user: { id: user.id, username: user.username, createdAt: user.createdAt } });
});

module.exports = router;
