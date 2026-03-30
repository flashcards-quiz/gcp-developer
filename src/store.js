import { reactive } from 'vue';

const QUIZ_SIZE = 10;

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandomQuestions(allQuestions, count) {
  const usable = allQuestions.filter(q => !q.hasImage);
  return shuffleArray(usable).slice(0, count);
}

function buildShuffledAnswers(question) {
  return shuffleArray([question.correctAnswer, ...question.wrongAnswers]);
}

const state = reactive({
  screen: 'home',
  allQuestions: [],
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
  answered: false,
  selectedAnswer: null,
});


function initQuestions(questions) {
  state.allQuestions = questions;
}

function startQuiz() {
  const selected = pickRandomQuestions(state.allQuestions, QUIZ_SIZE);
  state.questions = selected.map(q => ({
    ...q,
    shuffledAnswers: buildShuffledAnswers(q),
  }));
  state.currentIndex = 0;
  state.answers = [];
  state.score = 0;
  state.answered = false;
  state.selectedAnswer = null;
  state.screen = 'quiz';
}

function submitAnswer(selectedAnswer) {
  if (state.answered) return;

  const current = state.questions[state.currentIndex];
  const isCorrect = selectedAnswer === current.correctAnswer;

  state.answers.push({
    questionId: current.id,
    questionText: current.text,
    selectedAnswer,
    correctAnswer: current.correctAnswer,
    isCorrect,
  });

  state.selectedAnswer = selectedAnswer;
  state.answered = true;
  if (isCorrect) state.score++;
}

function nextQuestion() {
  if (state.currentIndex + 1 >= state.questions.length) {
    state.screen = 'results';
    return;
  }
  state.currentIndex++;
  state.answered = false;
  state.selectedAnswer = null;
}

function resetQuiz() {
  state.screen = 'home';
  state.questions = [];
  state.currentIndex = 0;
  state.answers = [];
  state.score = 0;
  state.answered = false;
  state.selectedAnswer = null;
}

export const store = {
  state,
  get currentQuestion() { return state.questions[state.currentIndex]; },
  get usableCount() { return state.allQuestions.filter(q => !q.hasImage).length; },
  get isLastQuestion() { return state.currentIndex >= state.questions.length - 1; },
  get scorePercentage() { return Math.round((state.score / state.questions.length) * 100); },
  initQuestions,
  startQuiz,
  submitAnswer,
  nextQuestion,
  resetQuiz,
};
