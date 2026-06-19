<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>📐 数学学习平台</h2>
      <p class="subtitle">登录你的账号</p>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="username" type="text" placeholder="请输入用户名" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="password" type="password" placeholder="请输入密码" required />
        </div>
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? '登录中...' : '登 录' }}
        </button>
      </form>

      <p class="auth-link">
        还没有账号？<router-link to="/register">立即注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (data.success) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.user.username)
      localStorage.setItem('userId', data.user.id)
      router.push('/')
    } else {
      error.value = data.message || '登录失败'
    }
  } catch (err) {
    error.value = '网络错误，请检查服务器是否启动'
  } finally {
    loading.value = false
  }
}
</script>
