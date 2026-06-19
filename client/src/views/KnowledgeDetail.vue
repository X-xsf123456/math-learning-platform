<template>
  <div v-if="levelData">
    <!-- Topic list view (when no specific topic selected) -->
    <div v-if="!currentTopic" class="topics-page">
      <h1>{{ levelData.icon }} {{ levelData.name }}</h1>
      <router-link to="/knowledge" class="back-link">← 返回知识体系</router-link>
      <div class="topic-list">
        <div
          v-for="(topic, index) in levelData.topics"
          :key="index"
          class="topic-item"
          @click="selectTopic(index)"
        >
          <h3>{{ index + 1 }}. {{ topic.title }}</h3>
          <p>{{ topic.description }}</p>
        </div>
      </div>
    </div>

    <!-- Topic detail view -->
    <div v-else class="detail-page">
      <a href="#" class="back-link" @click.prevent="currentTopic = null">← 返回{{ levelData.name }}</a>
      <div class="detail-card">
        <h1>{{ topicIndex + 1 }}. {{ currentTopic.title }}</h1>
        <p class="topic-desc">{{ currentTopic.description }}</p>

        <div class="content-section">
          <h3>📖 知识概述</h3>
          <p>{{ currentTopic.content.overview }}</p>
        </div>

        <div v-if="currentTopic.content.keyPoints?.length" class="content-section">
          <h3>🔑 核心要点</h3>
          <ul>
            <li v-for="(pt, i) in currentTopic.content.keyPoints" :key="i">{{ pt }}</li>
          </ul>
        </div>

        <div v-if="currentTopic.content.formulas?.length" class="content-section">
          <h3>📐 重要公式</h3>
          <div
            v-for="(formula, i) in currentTopic.content.formulas"
            :key="i"
            class="formula-box"
          >{{ formula }}</div>
        </div>

        <div v-if="currentTopic.content.examples?.length" class="content-section">
          <h3>✏️ 典型例题</h3>
          <ul>
            <li v-for="(ex, i) in currentTopic.content.examples" :key="i">{{ ex }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mathKnowledge } from '../data/mathKnowledge.js'

const route = useRoute()
const level = computed(() => route.params.level)
const topicIndex = computed(() => parseInt(route.params.topicIndex) || 0)

const levelData = computed(() => mathKnowledge[level.value] || null)

const currentTopic = ref(null)

// 从路由参数初始化
if (levelData.value && levelData.value.topics[topicIndex.value]) {
  currentTopic.value = levelData.value.topics[topicIndex.value]
}

function selectTopic(index) {
  currentTopic.value = levelData.value.topics[index]
}
</script>
