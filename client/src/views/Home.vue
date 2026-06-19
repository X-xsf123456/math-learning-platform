<template>
  <div class="home-page">
    <div class="home-hero">
      <h1>🎓 欢迎来到数学学习平台</h1>
      <p>涵盖小学、初中、高中、大学全部数学知识 · 支持 AI 智能问答搜题</p>
    </div>

    <div class="feature-grid">
      <router-link to="/knowledge?level=elementary" class="feature-card">
        <div class="icon">🧮</div>
        <h3>小学数学</h3>
        <p>数的认识 · 四则运算 · 分数小数 · 几何初步 · 应用题</p>
      </router-link>

      <router-link to="/knowledge?level=middle" class="feature-card">
        <div class="icon">📐</div>
        <h3>初中数学</h3>
        <p>代数 · 几何 · 函数 · 方程 · 统计与概率</p>
      </router-link>

      <router-link to="/knowledge?level=high" class="feature-card">
        <div class="icon">📊</div>
        <h3>高中数学</h3>
        <p>集合 · 三角函数 · 数列 · 解析几何 · 导数</p>
      </router-link>

      <router-link to="/knowledge?level=university" class="feature-card">
        <div class="icon">🎯</div>
        <h3>大学数学</h3>
        <p>微积分 · 线性代数 · 概率论 · 离散数学</p>
      </router-link>

      <router-link to="/ai-qa" class="feature-card">
        <div class="icon">🤖</div>
        <h3>AI 智能问答</h3>
        <p>DeepSeek · 豆包 · 千问 三大AI助力解题</p>
      </router-link>

      <div class="feature-card">
        <div class="icon">📝</div>
        <h3>知识体系</h3>
        <p>系统化整理，从基础到高阶循序渐进</p>
      </div>
    </div>
  </div>
</template>
