const path = require('path');

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || 'math-learning-platform-secret-2026',
  JWT_EXPIRES_IN: '24h',
  DATA_DIR: path.join(__dirname, 'data'),
  // AI API Keys - 通过环境变量配置
  DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY || '',
  DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions',
  DOUBAO_API_KEY: process.env.DOUBAO_API_KEY || '',
  DOUBAO_API_URL: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
  QIANWEN_API_KEY: process.env.QIANWEN_API_KEY || '',
  QIANWEN_API_URL: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'
};
