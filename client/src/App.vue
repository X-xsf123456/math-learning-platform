<template>
  <div id="app-root">
    <nav v-if="isLoggedIn" class="navbar">
      <div class="nav-brand">📐 数学学习平台</div>
      <div class="nav-links">
        <router-link to="/">🏠 首页</router-link>
        <router-link to="/knowledge">📚 知识体系</router-link>
        <router-link to="/ai-qa">🤖 AI 问答</router-link>
      </div>
      <div class="nav-user">
        <span class="username">👤 {{ username }}</span>
        <button class="btn-logout" @click="logout">退出登录</button>
      </div>
    </nav>
    <main :class="{ 'with-nav': isLoggedIn }">
      <router-view @login-success="handleLoginSuccess" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')

function checkLogin() {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('username')
  if (token) {
    isLoggedIn.value = true
    username.value = user || '用户'
  } else {
    isLoggedIn.value = false
    username.value = ''
  }
}

function handleLoginSuccess() {
  checkLogin()
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('userId')
  isLoggedIn.value = false
  router.push('/login')
}

onMounted(() => {
  checkLogin()
})
</script>
