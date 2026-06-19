const config = require('../config');

async function callDeepSeek(question) {
  if (!config.DEEPSEEK_API_KEY) {
    return { success: false, message: 'DeepSeek API Key 未配置，请在 server/config.js 或环境变量 DEEPSEEK_API_KEY 中设置' };
  }

  try {
    const response = await fetch(config.DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: '你是一个专业的数学教师，请用中文回答数学问题。回答要详细、准确，适合学生学习理解。如果涉及计算，请展示详细步骤。' },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return { success: true, answer: data.choices[0].message.content };
    }
    return { success: false, message: data.error?.message || 'DeepSeek 返回异常' };
  } catch (err) {
    console.error('DeepSeek API 错误:', err);
    return { success: false, message: 'DeepSeek API 调用失败: ' + err.message };
  }
}

async function callDoubao(question) {
  if (!config.DOUBAO_API_KEY) {
    return { success: false, message: '豆包 API Key 未配置，请在环境变量 DOUBAO_API_KEY 中设置' };
  }

  try {
    const response = await fetch(config.DOUBAO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.DOUBAO_API_KEY}`
      },
      body: JSON.stringify({
        model: 'ep-20241220113559-75j6l',
        messages: [
          { role: 'system', content: '你是一个专业的数学教师，请用中文回答数学问题。回答要详细、准确，适合学生学习理解。如果涉及计算，请展示详细步骤。' },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return { success: true, answer: data.choices[0].message.content };
    }
    return { success: false, message: data.error?.message || '豆包返回异常' };
  } catch (err) {
    console.error('豆包 API 错误:', err);
    return { success: false, message: '豆包 API 调用失败: ' + err.message };
  }
}

async function callQianwen(question) {
  if (!config.QIANWEN_API_KEY) {
    return { success: false, message: '千问 API Key 未配置，请在环境变量 QIANWEN_API_KEY 中设置' };
  }

  try {
    const response = await fetch(config.QIANWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.QIANWEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        messages: [
          { role: 'system', content: '你是一个专业的数学教师，请用中文回答数学问题。回答要详细、准确，适合学生学习理解。如果涉及计算，请展示详细步骤。' },
          { role: 'user', content: question }
        ],
        temperature: 0.3,
        max_tokens: 2048
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return { success: true, answer: data.choices[0].message.content };
    }
    return { success: false, message: data.error?.message || '千问返回异常' };
  } catch (err) {
    console.error('千问 API 错误:', err);
    return { success: false, message: '千问 API 调用失败: ' + err.message };
  }
}

module.exports = { callDeepSeek, callDoubao, callQianwen };
