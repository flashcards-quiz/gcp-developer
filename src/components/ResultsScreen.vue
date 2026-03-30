<script setup>
import { store } from '../store.js';
import ResultItem from './ResultItem.vue';
</script>

<template>
  <div class="container">
    <h2 class="results__title">Risultati</h2>
    <p class="results__score">Hai totalizzato {{ store.state.score }} / {{ store.state.questions.length }} ({{ store.scorePercentage }}%)</p>

    <div class="results__bar">
      <div class="results__bar-fill" :style="{ width: store.scorePercentage + '%' }"></div>
    </div>

    <div class="results__list">
      <ResultItem
        v-for="(answer, index) in store.state.answers"
        :key="index"
        :answer="answer"
        :index="index"
      />
    </div>

    <button class="btn btn--primary btn--retry" @click="store.resetQuiz">Riprova</button>
  </div>
</template>

<style scoped>
.results__title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.results__score {
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.results__bar {
  height: 12px;
  background: var(--color-border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 32px;
}

.results__bar-fill {
  height: 100%;
  background: var(--color-correct);
  border-radius: 6px;
  transition: width 0.6s ease;
}

.results__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.btn--retry {
  display: block;
  margin: 0 auto;
}
</style>
