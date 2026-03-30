<script setup>
import { ref } from 'vue';

defineProps({
  answer: Object,
  index: Number,
});

const isOpen = ref(false);
</script>

<template>
  <div class="result-item" :class="{ 'result-item--open': isOpen }">
    <div class="result-item__header" @click="isOpen = !isOpen">
      <span class="result-item__icon" :class="answer.isCorrect ? 'correct-text' : 'incorrect-text'">
        {{ answer.isCorrect ? '\u2713' : '\u2717' }}
      </span>
      <span class="result-item__question">
        {{ index + 1 }}. {{ answer.questionText.length > 80 ? answer.questionText.slice(0, 80) + '...' : answer.questionText }}
      </span>
    </div>
    <div class="result-item__detail">
      <p>
        <span class="label">La tua risposta: </span>
        <span :class="answer.isCorrect ? 'correct-text' : 'incorrect-text'">{{ answer.selectedAnswer }}</span>
      </p>
      <p v-if="!answer.isCorrect">
        <span class="label">Risposta corretta: </span>
        <span class="correct-text">{{ answer.correctAnswer }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.result-item {
  background: var(--color-card);
  border-radius: 10px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.result-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  font-size: 0.95rem;
}

.result-item__icon {
  flex-shrink: 0;
  font-size: 1.1rem;
}

.result-item__question {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-item__detail {
  display: none;
  padding: 0 16px 14px;
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
}

.result-item--open .result-item__detail {
  display: block;
  padding-top: 14px;
}

.result-item__detail p {
  margin-bottom: 8px;
}

.label {
  font-weight: 600;
  color: var(--color-text);
}

.correct-text {
  color: var(--color-correct);
}

.incorrect-text {
  color: var(--color-incorrect);
}
</style>
