const DATA_URL = 'data/questions.json';

export async function loadQuestions() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Failed to load questions: ${response.status}`);
  }
  return response.json();
}
