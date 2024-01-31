// Import the useState hook from the React module
import React, { useState } from 'react';

// Import the fetchQuizQuestions function from the API module
import { fetchQuizQuestions } from './API';

// Imports the QuestionCard component from the QuestionCard module
import QuestionCard from './components/QuestionCard';

//Imports the QuestionsState and Difficulty types from the API module
import { QuestionsState, Difficulty } from './API';

// Imports the GlobalStyle and Wrapper styled components from the App.styles module
import { GlobalStyle, Wrapper } from './App.styles';

// Defines the AnswerObject type, which represents an object containing the user's answer, the correct answer, and whether the user's answer was correct
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

// Set the total number of questions
const TOTAL_QUESTIONS = 10;

// Defines the App functional component
const App: React.FC = () => {
  // Use the useState hook to create state variables for loading, questions, number, userAnswers, score, and gameOver
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // Defines the startTrivia function, which is called when the user clicks the Start button
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    // Fetches a new set of questions using the fetchQuizQuestions function
    const newQuestions = await fetchQuizQuestions(
      // Sets the state variables for questions, score, and userAnswers to their initial values
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // Defines the checkAnswer function, which is called when the user clicks an answer
  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // Gets the user's answer from the event object
      const answer = e.currentTarget.value;
      // Check user's answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add to score if user's answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the user's answer in the array for user answers (userAnswers)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // Defines the nextQuestion function, which is called when the user clicks the Next Question button
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  //Renders the App component
  return (
    <>
      {/* Renders the GlobalStyle component */}
      <GlobalStyle />
      {/* Renders the Wrapper component */}
      <Wrapper>
        {/* Renders the REACT QUIZ heading */}
        <h1>REACT QUIZ</h1>
        {/* If the game is over or the userAnswers array is the same length as the TOTAL_QUESTIONS constant, render the Start button */}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;