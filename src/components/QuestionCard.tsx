import React from 'react';
// Import the AnswerObject type from the App module
import { AnswerObject } from '../App';
// Import the Wrapper and ButtonWrapper styled components from the QuestionCard.styles module
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

// Defines the Props type for the QuestionCard component
type Props = {
  // The question to display
  question: string;
  // The array of answers to display
  answers: string[];
  // The callback function to call when an answer is clicked
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // The user's answer for this question, if it has been answered
  userAnswer: AnswerObject | undefined;
  // The current question number
  questionNr: number;
  // The total number of questions
  totalQuestions: number;
};

// Defines the QuestionCard functional component
const QuestionCard: React.FC<Props> = ({
  // Destructure the props and set their types
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  // Renders the QuestionCard component
  <Wrapper>
    {/* Displays the question number and total number of questions */}
    <p className='number'>
      Question: {questionNr} / {totalQuestions}
    </p>
    {/* Displays the question using the dangerouslySetInnerHTML prop to allow for HTML content */}
    <p dangerouslySetInnerHTML={{ __html: question }} />
    {/* Maps over the answers and render a ButtonWrapper component for each one */}
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          // Sets the correct prop based on whether the user's answer matches the correct answer
          correct={userAnswer?.correctAnswer === answer}
          // Sets the userClicked prop based on whether the user's answer matches the current answer
          userClicked={userAnswer?.answer === answer}
          key={answer}
        >
          {/* Renders a button with the answer as its value and the dangerouslySetInnerHTML prop to allow for HTML content */}
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

// Exports the QuestionCard component as the default export
export default QuestionCard;