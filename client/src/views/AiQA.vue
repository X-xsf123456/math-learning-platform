<template>
  <div class="ai-qa-page">
    <h1>🤖 AI 智能问答</h1>
    <p class="subtitle">选择 AI 平台，输入数学问题即可获得解答</p>

    <!-- Platform tabs -->
    <div class="platform-tabs">
      <div
        v-for="p in platforms"
        :key="p.key"
        :class="['platform-tab', { active: currentPlatform === p.key }]"
        @click="currentPlatform = p.key"
      >
        {{ p.icon }} {{ p.name }}
      </div>
    </div>

    <!-- Question input -->
    <div class="question-input">
      <textarea
        v-model="question"
        placeholder="请输入数学题目或问题，例如：求解一元二次方程 x² - 5x + 6 = 0"
        @keydown.ctrl.enter="askAI"
      ></textarea>
      <button @click="askAI" :disabled="loading || !question.trim()">
        {{ loading ? '思考中...' : '提问' }}
      </button>
    </div>

    <!-- Answer display -->
    <div class="answer-box" v-if="answer || error || loading">
      <div v-if="loading" class="loading">
        ⏳ AI 正在思考中，请稍候...
      </div>
      <div v-else-if="error" class="error">
        ❌ {{ error }}
      </div>
      <div v-else>
        <div class="answer-header">
          <span class="answer-platform">
            {{ currentPlatformData.icon }} {{ currentPlatformData.name }} 的回答
          </span>
        </div>
        <div class="answer-content">{{ answer }}</div>
      </div>
    </div>

    <!-- Empty state -->
    <div class="answer-box" v-else>
      <div style="text-align:center;color:#aaa;padding:48px 24px;">
        <div style="font-size:48px;margin-bottom:12px;">💡</div>
        <p>在上方输入数学问题，选择一个 AI 平台开始提问</p>
        <p style="font-size:12px;margin-top:8px;">支持 DeepSeek · 豆包 · 千问</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const platforms = [
  { key: 'deepseek', name: 'DeepSeek', icon: '🔍' },
  { key: 'doubao', name: '豆包', icon: '🫘' },
  { key: 'qianwen', name: '千问', icon: '💬' }
]

const currentPlatform = ref('deepseek')
const question = ref('')
const answer = ref('')
const error = ref('')
const loading = ref(false)

const currentPlatformData = computed(() =>
  platforms.find(p => p.key === currentPlatform.value)
)

async function askAI() {
  if (!question.value.trim() || loading.value) return

  answer.value = ''
  error.value = ''
  loading.value = true

  try {
    const token = localStorage.getItem('token')
    const res = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        question: question.value.trim(),
        platform: currentPlatform.value
      })
    })

    const data = await res.json()

    if (data.success) {
      answer.value = data.answer
    } else {
      error.value = data.message || 'AI 返回异常'
    }
  } catch (err) {
    error.value = '网络错误，请检查服务器是否启动，以及 AI API Key 是否配置'
  } finally {
    loading.value = false
  }
}
</script>
