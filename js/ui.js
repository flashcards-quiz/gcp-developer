const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const screens = { home: $('#home'), quiz: $('#quiz'), results: $('#results') };
const elements = {
  questionCount: $('#questionCount'),
  startBtn: $('#startBtn'),
  progress: $('#progress'),
  score: $('#score'),
  questionBadge: $('#questionBadge'),
  contextContainer: $('#contextContainer'),
  contextText: $('#contextText'),
  questionText: $('#questionText'),
  answersContainer: $('#answersContainer'),
  nextBtn: $('#nextBtn'),
  finalScore: $('#finalScore'),
  scoreBar: $('#scoreBar'),
  resultsList: $('#resultsList'),
  retryBtn: $('#retryBtn'),
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('screen--hidden', key !== name);
  });
}

export function renderHome(usableCount) {
  elements.questionCount.textContent = `${usableCount} domande disponibili`;
  showScreen('home');
}

export function renderQuestion(state, question, onAnswer) {
  showScreen('quiz');

  elements.progress.textContent = `Domanda ${state.currentIndex + 1} / ${state.questions.length}`;
  elements.score.textContent = `Score: ${state.score}`;
  elements.questionBadge.textContent = `Q.${question.id}`;

  if (question.context) {
    elements.contextContainer.classList.remove('screen--hidden');
    elements.contextContainer.removeAttribute('open');
    elements.contextText.textContent = question.context;
  } else {
    elements.contextContainer.classList.add('screen--hidden');
  }

  elements.questionText.textContent = question.text;
  elements.answersContainer.innerHTML = '';
  elements.nextBtn.classList.add('screen--hidden');

  question.shuffledAnswers.forEach(answerText => {
    const answerEl = createAnswerElement(answerText, () => onAnswer(answerText));
    elements.answersContainer.appendChild(answerEl);
  });
}

function createAnswerElement(text, onClick) {
  const el = document.createElement('div');
  el.className = 'answer';
  el.dataset.answer = text;
  el.innerHTML = `<span class="answer__radio"></span><span class="answer__text">${escapeHtml(text)}</span>`;
  el.addEventListener('click', onClick, { once: true });
  return el;
}

export function renderAnswerFeedback(selectedAnswer, correctAnswer, isLast) {
  const answerEls = $$('.answer');

  answerEls.forEach(el => {
    el.classList.add('answer--disabled');
    const text = el.dataset.answer;

    if (text === correctAnswer) {
      el.classList.add('answer--correct');
      el.querySelector('.answer__radio').outerHTML = '<span class="answer__icon">&#10003;</span>';
    }

    if (text === selectedAnswer && selectedAnswer !== correctAnswer) {
      el.classList.add('answer--incorrect', 'answer--selected');
      el.querySelector('.answer__radio').outerHTML = '<span class="answer__icon">&#10007;</span>';
    }

    if (text === selectedAnswer && selectedAnswer === correctAnswer) {
      el.classList.add('answer--selected');
    }
  });

  elements.nextBtn.textContent = isLast ? 'Vedi Risultati' : 'Prossima';
  elements.nextBtn.classList.remove('screen--hidden');
}

export function updateScore(score) {
  elements.score.textContent = `Score: ${score}`;
}

export function renderResults(state) {
  showScreen('results');

  const total = state.questions.length;
  const percentage = Math.round((state.score / total) * 100);

  elements.finalScore.textContent = `Hai totalizzato ${state.score} / ${total} (${percentage}%)`;
  elements.scoreBar.style.width = `${percentage}%`;

  elements.resultsList.innerHTML = '';
  state.answers.forEach((answer, index) => {
    elements.resultsList.appendChild(createResultItem(answer, index));
  });
}

function createResultItem(answer, index) {
  const item = document.createElement('div');
  item.className = 'result-item';

  const icon = answer.isCorrect ? '&#10003;' : '&#10007;';
  const iconColor = answer.isCorrect ? 'correct-text' : 'incorrect-text';
  const truncatedQuestion = truncate(answer.questionText, 80);

  item.innerHTML = `
    <div class="result-item__header">
      <span class="result-item__icon ${iconColor}">${icon}</span>
      <span class="result-item__question">${index + 1}. ${escapeHtml(truncatedQuestion)}</span>
    </div>
    <div class="result-item__detail">
      <p><span class="label">La tua risposta:</span>
        <span class="${answer.isCorrect ? 'correct-text' : 'incorrect-text'}">${escapeHtml(answer.selectedAnswer)}</span>
      </p>
      ${!answer.isCorrect ? `<p><span class="label">Risposta corretta:</span>
        <span class="correct-text">${escapeHtml(answer.correctAnswer)}</span></p>` : ''}
    </div>
  `;

  item.querySelector('.result-item__header').addEventListener('click', () => {
    item.classList.toggle('result-item--open');
  });

  return item;
}

export function onStart(callback) {
  elements.startBtn.addEventListener('click', callback);
}

export function onNext(callback) {
  elements.nextBtn.addEventListener('click', callback);
}

export function onRetry(callback) {
  elements.retryBtn.addEventListener('click', callback);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
