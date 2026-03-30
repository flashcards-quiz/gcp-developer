<script setup>
import { store } from '../store.js';
import AnswerOption from './AnswerOption.vue';

function handleSelect(answerText) {
  store.submitAnswer(answerText);
}
</script>

<template>
  <div class="container">
    <div class="quiz__header">
      <span class="quiz__progress">Domanda {{ store.state.currentIndex + 1 }} / {{ store.state.questions.length }}</span>
      <span class="quiz__score">Score: {{ store.state.score }}</span>
    </div>

    <div class="card" v-if="store.currentQuestion">
      <span class="card__badge">Q.{{ store.currentQuestion.id }}</span>

      <details v-if="store.currentQuestion.context" class="card__context">
        <summary>Mostra contesto Case Study</summary>
        <div>{{ store.currentQuestion.context }}</div>
      </details>

      <div class="card__question">{{ store.currentQuestion.text }}</div>

      <div class="card__answers">
        <AnswerOption
          v-for="answer in store.currentQuestion.shuffledAnswers"
          :key="answer"
          :text="answer"
          :correct-answer="store.currentQuestion.correctAnswer"
          :selected-answer="store.state.selectedAnswer"
          :answered="store.state.answered"
          @select="handleSelect"
        />
      </div>
    </div>

    <button
      v-if="store.state.answered"
      class="btn btn--primary btn--next"
      @click="store.nextQuestion"
    >
      {{ store.isLastQuestion ? 'Vedi Risultati' : 'Prossima' }}
    </button>
  </div>
</template>

<style scoped>
.quiz__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.card {
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
}

.card__badge {
  display: inline-block;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.card__context {
  background: #f1f3f4;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  max-height: 300px;
  overflow-y: auto;
}

.card__context summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-primary);
}

.card__context[open] summary {
  margin-bottom: 8px;
}

.card__question {
  font-size: 1.05rem;
  margin-bottom: 20px;
  white-space: pre-wrap;
}

.card__answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn--next {
  display: block;
  margin: 20px auto 0;
}

@media (max-width: 480px) {
  .card {
    padding: 16px;
  }
}
</style>
