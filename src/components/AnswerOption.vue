<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: String,
  correctAnswer: String,
  selectedAnswer: String,
  answered: Boolean,
});

const emit = defineEmits(['select']);

const isCorrect = computed(() => props.text === props.correctAnswer);
const isSelected = computed(() => props.text === props.selectedAnswer);
const isWrongSelection = computed(() => isSelected.value && !isCorrect.value);

const classes = computed(() => ({
  answer: true,
  'answer--disabled': props.answered,
  'answer--correct': props.answered && isCorrect.value,
  'answer--incorrect': props.answered && isWrongSelection.value,
  'answer--selected': isSelected.value,
}));

const showCheck = computed(() => props.answered && isCorrect.value);
const showCross = computed(() => props.answered && isWrongSelection.value);

function handleClick() {
  if (!props.answered) emit('select', props.text);
}
</script>

<template>
  <div :class="classes" @click="handleClick">
    <span v-if="showCheck" class="answer__icon">&#10003;</span>
    <span v-else-if="showCross" class="answer__icon">&#10007;</span>
    <span v-else class="answer__radio"></span>
    <span class="answer__text">{{ text }}</span>
  </div>
</template>

<style scoped>
.answer {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  font-size: 0.95rem;
}

@media (hover: hover) {
  .answer:hover {
    border-color: var(--color-primary);
    background: #e8f0fe;
  }
}

.answer--disabled {
  pointer-events: none;
}

.answer__radio {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  margin-top: 2px;
  position: relative;
  transition: border-color 0.2s;
}

.answer--selected .answer__radio {
  border-color: var(--color-primary);
}

.answer--selected .answer__radio::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
}

.answer--correct {
  border-color: var(--color-correct);
  background: var(--color-correct-bg);
}

.answer--correct .answer__radio {
  border-color: var(--color-correct);
}

.answer--correct .answer__radio::after {
  background: var(--color-correct);
}

.answer--incorrect {
  border-color: var(--color-incorrect);
  background: var(--color-incorrect-bg);
}

.answer--incorrect .answer__radio {
  border-color: var(--color-incorrect);
}

.answer--incorrect .answer__radio::after {
  background: var(--color-incorrect);
}

.answer__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  font-size: 1rem;
  line-height: 20px;
  text-align: center;
}

@media (max-width: 480px) {
  .answer {
    padding: 12px;
    font-size: 0.9rem;
  }
}
</style>
