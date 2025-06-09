import React, { useState } from 'react';
import { simplify } from 'mathjs';
import './ChainGame2.css';
import { useNavigate } from 'react-router-dom';


const questions = [
  '(x + 1)^2',
  '(2x + 3)^3',
  '(4x + 1)^2',
  '(3x^2 + 2x)^3',
  '(5x^3 + 4x^2 + 1)^4'
];


const hintsArray = [
  "Step 1: Differentiate the outer function first.",
  "Step 2: Now differentiate what's inside the bracket.",
  "Step 3: Multiply both results together!",
  "Take it slow and apply the power rule correctly.",
  "Watch out for complex inner derivatives!"
];


const differentiateStepwise = (expression) => {
  switch (expression) {
    case '(x + 1)^2':
      return ['2(x + 1)', '1', '2(x + 1)'];
    case '(2x + 3)^3':
      return ['3(2x + 3)^2', '2', '6(2x + 3)^2'];
    case '(4x + 1)^2':
      return ['2(4x + 1)', '4', '8(4x + 1)'];
    case '(3x^2 + 2x)^3':
      return ['3(3x^2 + 2x)^2', '6x + 2', '3(3x^2 + 2x)^2 * (6x + 2)'];
    case '(5x^3 + 4x^2 + 1)^4':
      return ['4(5x^3 + 4x^2 + 1)^3', '15x^2 + 8x', '60(5x^3 + 4x^2 + 1)^3 * (15x^2 + 8x)'];
    default:
      return ['', '', ''];
  }
};


const ChainGame2 = () => {
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState(['', '', '']);
  const [message, setMessage] = useState('');
  const [hint, setHint] = useState('');
  const [step, setStep] = useState(0);


  const handleSubmit = () => {
    try {
      const correctAnswers = differentiateStepwise(questions[questionIndex]);
      console.log(`Question: ${questions[questionIndex]}`);
      console.log(`Correct Answers: ${correctAnswers}`);
      console.log(`User Input at Step ${step}: ${userInput[step]}`);
     
      if (simplify(userInput[step]).toString() === simplify(correctAnswers[step]).toString()) {
        console.log('✅ Correct Answer!');
        if (step < 2) {
          setMessage('Correct! Now move to the next step.');
          setStep(step + 1);
        } else {
          setMessage('Correct! Moving to the next question.');
          nextQuestion();
        }
      } else {
        console.log('❌ Incorrect Answer!');
        setMessage(step === 2 ? `Incorrect. The correct multiplication result is: ${correctAnswers[2]}` : 'Incorrect. Try again or check your steps.');
      }
    } catch (error) {
      console.log('⚠️ Invalid input format.');
      setMessage('Invalid input format. Please check your notation.');
    }
  };


  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setUserInput(['', '', '']);
      setMessage('');
      setHint('');
      setStep(0);
    } else {
      setMessage('Great job! You’ve completed all the questions.');
    }
  };


  const showHint = () => {
    setHint(hintsArray[step]);
  };


  return (<>
    <div className="game-container">
      <button className="back-button" onClick={() => navigate('/DifferentialCalculus')}>Back</button>
      <h1>Chain Rule Step-by-Step Game</h1>
      <p>Differentiate step by step: first the outer function, then the inner, then multiply.</p>
      <h2>Question {questionIndex + 1}: {questions[questionIndex]}</h2>
      <h3>{step === 0 ? 'Differentiate the outer function' : step === 1 ? 'Differentiate the inner function' : 'Multiply both results'}</h3>
      <input
        type="text"
        value={userInput[step]}
        onChange={(e) => setUserInput([...userInput.slice(0, step), e.target.value, ...userInput.slice(step + 1)])}
        placeholder="Enter your answer"
      />
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={nextQuestion}>Skip</button>
      <button onClick={showHint}>Hint</button>
      <p className="message">{message}</p>
      <p className="hint">{hint}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(questionIndex + 1) * 20}%` }}></div>
      </div>
    </div>
    <div className="explanation">
      <h4>Guide on Answering the Questions:</h4>
      <p>Question Example: <strong>6(2x+3)^3</strong></p>
      <h6>Please beware of the style of answers accepted!</h6>


      <div className="derivative-container">
        <div className="derivative-box">
          <h5>Outer Derivative:</h5>
          <ul>
            <li>18(2x+3)^2</li>
          </ul>
        </div>


        <div className="derivative-box">
          <h5>Inner Derivative:</h5>
          <ul>
            <li>2</li>
          </ul>
        </div>
      </div>
      <p>Final Answer: 36(2x+3)^2</p>
    </div>
  </>);
};


export default ChainGame2;


