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
  const all = [question.correctAnswer, ...question.wrongAnswers];
  return shuffleArray(all);
}

export function createQuizState() {
  return {
    screen: 'home',
    allQuestions: [],
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    answered: false,
  };
}

export function initQuestions(state, allQuestions) {
  return { ...state, allQuestions };
}

export function startQuiz(state) {
  const selected = pickRandomQuestions(state.allQuestions, QUIZ_SIZE);
  const questions = selected.map(q => ({
    ...q,
    shuffledAnswers: buildShuffledAnswers(q),
  }));

  return {
    ...state,
    screen: 'quiz',
    questions,
    currentIndex: 0,
    answers: [],
    score: 0,
    answered: false,
  };
}

export function submitAnswer(state, selectedAnswer) {
  if (state.answered) return state;

  const current = state.questions[state.currentIndex];
  const isCorrect = selectedAnswer === current.correctAnswer;

  const answer = {
    questionId: current.id,
    questionText: current.text,
    selectedAnswer,
    correctAnswer: current.correctAnswer,
    isCorrect,
  };

  return {
    ...state,
    answered: true,
    score: state.score + (isCorrect ? 1 : 0),
    answers: [...state.answers, answer],
  };
}

export function nextQuestion(state) {
  const nextIndex = state.currentIndex + 1;

  if (nextIndex >= state.questions.length) {
    return { ...state, screen: 'results' };
  }

  return {
    ...state,
    currentIndex: nextIndex,
    answered: false,
  };
}

export function resetQuiz(state) {
  return {
    ...state,
    screen: 'home',
    questions: [],
    currentIndex: 0,
    answers: [],
    score: 0,
    answered: false,
  };
}

export function getUsableCount(state) {
  return state.allQuestions.filter(q => !q.hasImage).length;
}

export function getCurrentQuestion(state) {
  return state.questions[state.currentIndex];
}

export function isLastQuestion(state) {
  return state.currentIndex >= state.questions.length - 1;
}
