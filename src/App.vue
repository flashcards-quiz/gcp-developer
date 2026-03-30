<script setup>
import { onMounted } from 'vue';
import { store } from './store.js';
import HomeScreen from './components/HomeScreen.vue';
import QuizScreen from './components/QuizScreen.vue';
import ResultsScreen from './components/ResultsScreen.vue';

onMounted(async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}data/questions.json`);
  const questions = await response.json();
  store.initQuestions(questions);
});
</script>

<template>
  <HomeScreen v-if="store.state.screen === 'home'" />
  <QuizScreen v-else-if="store.state.screen === 'quiz'" />
  <ResultsScreen v-else-if="store.state.screen === 'results'" />
</template>
