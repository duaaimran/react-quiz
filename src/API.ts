// Imports the shuffleArray function from the utils module
import { shuffleArray } from './utils';

// Defines the Question type, which represents a single question object
export type Question = {
  // The category of the question
  category: string;
  // The correct answer to the question
  correct_answer: string;
  // The difficulty of the question
  difficulty: string;
  // The incorrect answers to the question
  incorrect_answers: string[];
  // The question itself
  question: string;
  // The type of question (in this case, multiple choice)
  type: string;
};

// Defines the Difficulty enum, which represents the difficulty levels
export enum Difficulty {
  // The easy difficulty level
  EASY = "easy",
  // The medium difficulty level
  MEDIUM = "medium",
  // The hard difficulty level
  HARD = "hard",
}

// Defines the QuestionsState type, which represents a single question object with an additional answers array
export type QuestionsState = Question & { answers: string[] };

// Defines the fetchQuizQuestions function, which fetches a specified number of questions with a specified difficulty level
export const fetchQuizQuestions = async (
  // The number of questions to fetch
  amount: number,
  // The difficulty level of the questions to fetch
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  // Sets the endpoint URL based on the amount and difficulty parameters
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  // Fetches the data from the endpoint
  const data = await (await fetch(endpoint)).json();
  // Maps over the results array and return a new array of questions with the answers array shuffled
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};