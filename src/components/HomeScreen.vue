<script setup>
import { store } from '../store.js';
</script>

<template>
  <div class="container home">
    <p class="home__subtitle">{{ store.usableCount }} domande disponibili</p>
    <h1 class="home__title">GCP Exam Practice</h1>
    <button class="btn btn--primary" @click="store.startQuiz">Inizia Quiz (10 domande)</button>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.home__title {
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 8px;
}

.home__subtitle {
  text-align: center;
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .home__title {
    font-size: 1.8rem;
  }
}
</style>
