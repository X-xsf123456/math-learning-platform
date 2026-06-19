const express = require('express');
const auth = require('../middleware/auth');
const { callDeepSeek, callDoubao, callQianwen } = require('../services/aiServices');

const router = express.Router();

// 所有 AI 路由都需要登录
router.use(auth);

// AI 问答接口
router.post('/ask', async (req, res) => {
  const { question, platform } = req.body;

  if (!question || !question.trim()) {
    return res.status(400).json({ success: false, message: '请输入问题' });
  }

  if (!['deepseek', 'doubao', 'qianwen'].includes(platform)) {
    return res.status(400).json({ success: false, message: '请选择有效的AI平台: deepseek / doubao / qianwen' });
  }

  let result;
  switch (platform) {
    case 'deepseek':
      result = await callDeepSeek(question.trim());
      break;
    case 'doubao':
      result = await callDoubao(question.trim());
      break;
    case 'qianwen':
      result = await callQianwen(question.trim());
      break;
  }

  res.json(result);
});

module.exports = router;
