<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>📐 数学学习平台</h2>
      <p class="subtitle">创建新账号</p>

      <div v-if="error" class="error-msg">{{ error }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>用户名</label>
          <input v-model="username" type="text" placeholder="3-20个字符" required />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input v-model="password" type="password" placeholder="至少6个字符" required />
        </div>
        <div class="form-group">
          <label>确认密码</label>
          <input v-model="confirmPassword" type="password" placeholder="再次输入密码" required />
        </div>
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? '注册中...' : '注 册' }}
        </button>
      </form>

      <p class="auth-link">
        已有账号？<router-link to="/login">去登录</router-link>
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
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  loading.value = true

  try {
    const res = await fetch('/api/auth/register', {
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
      error.value = data.message || '注册失败'
    }
  } catch (err) {
    error.value = '网络错误，请检查服务器是否启动'
  } finally {
    loading.value = false
  }
}
</script>
