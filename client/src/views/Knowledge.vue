<template>
  <div class="knowledge-page">
    <h1>📚 数学知识体系</h1>
    <div class="level-grid">
      <router-link
        v-for="level in levels"
        :key="level.key"
        :to="`/knowledge/${level.key}/0`"
        class="level-card"
      >
        <div class="level-icon">{{ level.icon }}</div>
        <h3>{{ level.name }}</h3>
        <p style="font-size:13px;color:#888;margin-top:6px;">{{ level.count }} 个知识点</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { mathKnowledge } from '../data/mathKnowledge.js'

const levels = Object.entries(mathKnowledge).map(([key, val]) => ({
  key,
  name: val.name,
  icon: val.icon,
  count: val.topics.length
}))
</script>
