import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SEPARATOR = '--------------------------------------------------';
const CORRECT_MARKER = 'corretta/e:';
const WRONG_MARKER = 'sbagliate:';
const CASE_STUDY_INDICATOR = 'This is a case study';
const CASE_STUDY_REFER_PATTERN = /For this question, refer to the .+ case study/i;

function parseAnswers(text) {
  const answers = [];
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ')) {
      answers.push(trimmed.slice(2).trim());
    } else if (trimmed && answers.length > 0) {
      answers[answers.length - 1] += ' ' + trimmed;
    }
  }
  return answers;
}

function extractCaseStudyParts(text) {
  const lines = text.split('\n');
  let referLineIndex = -1;

  for (let i = lines.length - 1; i >= 0; i--) {
    if (CASE_STUDY_REFER_PATTERN.test(lines[i])) {
      referLineIndex = i;
      break;
    }
  }

  if (referLineIndex === -1) {
    return { context: null, question: text.trim() };
  }

  const context = lines.slice(0, referLineIndex).join('\n').trim();
  const question = lines.slice(referLineIndex).join('\n').trim();
  return { context, question };
}

function parseBlock(block) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  const correctIndex = trimmed.indexOf(CORRECT_MARKER);
  const wrongIndex = trimmed.indexOf(WRONG_MARKER);
  if (correctIndex === -1 || wrongIndex === -1) return null;

  const rawQuestion = trimmed.slice(0, correctIndex).trim();
  const correctSection = trimmed.slice(correctIndex + CORRECT_MARKER.length, wrongIndex).trim();
  const wrongSection = trimmed.slice(wrongIndex + WRONG_MARKER.length).trim();

  const idMatch = rawQuestion.match(/^(\d+)\.\s/);
  const id = idMatch ? parseInt(idMatch[1], 10) : null;

  const correctAnswers = parseAnswers(correctSection);
  const wrongAnswers = parseAnswers(wrongSection);

  const hasImage = correctAnswers.some(a => !a) || wrongAnswers.some(a => !a);
  const filteredCorrect = correctAnswers.filter(Boolean);
  const filteredWrong = wrongAnswers.filter(Boolean);

  if (filteredCorrect.length === 0 || filteredWrong.length === 0) {
    return null;
  }

  const isCaseStudy = rawQuestion.includes(CASE_STUDY_INDICATOR);
  let text = rawQuestion;
  let context = null;

  if (isCaseStudy) {
    const parts = extractCaseStudyParts(rawQuestion);
    context = parts.context;
    text = parts.question;
  }

  return {
    id,
    text,
    context,
    correctAnswer: filteredCorrect[0],
    wrongAnswers: filteredWrong,
    hasImage,
  };
}

function build() {
  const inputPath = path.join(__dirname, 'domande.md');
  const outputDir = path.join(__dirname, 'public', 'data');
  const outputPath = path.join(outputDir, 'questions.json');

  const content = fs.readFileSync(inputPath, 'utf-8');
  const blocks = content.split(SEPARATOR);

  const questions = blocks
    .map(parseBlock)
    .filter(Boolean);

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2), 'utf-8');

  const imageQuestions = questions.filter(q => q.hasImage).length;
  const caseStudyQuestions = questions.filter(q => q.context).length;
  const usableQuestions = questions.filter(q => !q.hasImage).length;

  console.log(`Parsed ${questions.length} questions`);
  console.log(`  Case study: ${caseStudyQuestions}`);
  console.log(`  With images (skipped in quiz): ${imageQuestions}`);
  console.log(`  Usable for quiz: ${usableQuestions}`);
  console.log(`Output: ${outputPath}`);
}

build();
