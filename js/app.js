import { loadQuestions } from './parser.js';
import {
  createQuizState,
  initQuestions,
  startQuiz,
  submitAnswer,
  nextQuestion,
  resetQuiz,
  getUsableCount,
  getCurrentQuestion,
  isLastQuestion,
} from './quiz.js';
import {
  renderHome,
  renderQuestion,
  renderAnswerFeedback,
  updateScore,
  renderResults,
  onStart,
  onNext,
  onRetry,
} from './ui.js';

let state = createQuizState();

function handleAnswer(selectedAnswer) {
  state = submitAnswer(state, selectedAnswer);
  const current = getCurrentQuestion(state);
  updateScore(state.score);
  renderAnswerFeedback(selectedAnswer, current.correctAnswer, isLastQuestion(state));
}

function handleNext() {
  state = nextQuestion(state);

  if (state.screen === 'results') {
    renderResults(state);
  } else {
    renderQuestion(state, getCurrentQuestion(state), handleAnswer);
  }
}

function handleStart() {
  state = startQuiz(state);
  renderQuestion(state, getCurrentQuestion(state), handleAnswer);
}

function handleRetry() {
  state = resetQuiz(state);
  renderHome(getUsableCount(state));
}

async function init() {
  const questions = await loadQuestions();
  state = initQuestions(state, questions);

  onStart(handleStart);
  onNext(handleNext);
  onRetry(handleRetry);

  renderHome(getUsableCount(state));
}

init();
