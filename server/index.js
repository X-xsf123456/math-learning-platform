const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));

// 生产环境：托管前端静态文件
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('前端尚未构建。请运行 npm run build (client/)');
    }
  });
});

// 全局错误处理
app.use((err, req, res, _next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// 启动
app.listen(config.PORT, () => {
  console.log(`🚀 数学学习平台后端已启动: http://localhost:${config.PORT}`);
  console.log(`📁 数据目录: ${config.DATA_DIR}`);
  console.log(`🤖 AI平台: DeepSeek | 豆包 | 千问`);
  if (!config.DEEPSEEK_API_KEY) console.log('⚠️  DeepSeek API Key 未配置');
  if (!config.DOUBAO_API_KEY) console.log('⚠️  豆包 API Key 未配置');
  if (!config.QIANWEN_API_KEY) console.log('⚠️  千问 API Key 未配置');
});
