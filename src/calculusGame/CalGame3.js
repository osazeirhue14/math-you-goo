import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './CalGame3.css';
import FooterC from './FooterC';


const generateFunction = (difficulty) => {
  return [difficulty * 2, difficulty, -difficulty, difficulty + 3];
};


const formatExpression = (expression) => {
  return expression.replace(/\+\s*-/g, '- '); // Fixes "+ -1x" issue
};


const computeDerivatives = (coefficients) => {
  const firstDerivative = formatExpression(
    `${3 * coefficients[0]}x^2 + ${2 * coefficients[1]}x + ${coefficients[2]}`
  );
  const secondDerivative = formatExpression(
    `${6 * coefficients[0]}x + ${2 * coefficients[1]}`
  );
  return { firstDerivative, secondDerivative };
};


const hintsArray = [
  'Power Rule: d/dx[x^n] = n*x^(n-1).',
  'Don’t forget: The derivative of a constant is 0!',
  'When differentiating a sum, differentiate each term separately.',
  'Sum Rule: Differentiate terms separately and then combine.',
  'Watch out for negative exponents and fractions!',
];


const CalGame3 = () => {
  const [step, setStep] = useState(1);
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [functionCoefficients, setFunctionCoefficients] = useState(generateFunction(1));
  const [correctSteps, setCorrectSteps] = useState(computeDerivatives(functionCoefficients));
  const [hint, setHint] = useState('');
  const [logShown, setLogShown] = useState(false);


  if (!logShown) {
    console.log('Generated Question:', functionCoefficients);
    console.log('Expected Answers:', correctSteps);
    setLogShown(true);
  }


  const handleSubmit = () => {
    try {
      const correctAnswer = correctSteps[step === 1 ? 'firstDerivative' : 'secondDerivative'];
      console.log('User Input:', userInput);
      console.log('Correct Answer:', correctAnswer);


      // Remove spaces to allow "12x + 2" and "12x+2" to be treated the same
      const formattedUserInput = userInput.replace(/\s+/g, '');
      const formattedCorrectAnswer = correctAnswer.replace(/\s+/g, '');


      // Evaluate at x = 2 to check correctness
      const testValue = 2;
      const userEval = evaluate(formattedUserInput.replace(/x/g, `(${testValue})`));
      const correctEval = evaluate(formattedCorrectAnswer.replace(/x/g, `(${testValue})`));


      if (userEval === correctEval) {
        setMessage('Correct! Move to the next step.');
        if (step < 2) {
          setStep(step + 1);
          setUserInput('');
        } else {
          if (questionIndex < 4) {
            setMessage('Correct! Moving to the next question.');
            nextQuestion();
          } else {
            setMessage('Great job! You’ve completed all the questions.');
          }
        }
      } else {
        setMessage('Incorrect. Try again or check your steps.');
      }
    } catch (error) {
      setMessage('Invalid input format. Please check your notation.');
    }
  };


  const nextQuestion = () => {
    if (questionIndex < 4) {
      const newIndex = questionIndex + 1;
      setQuestionIndex(newIndex);
      const newCoefficients = generateFunction(newIndex + 1);
      setFunctionCoefficients(newCoefficients);
      setCorrectSteps(computeDerivatives(newCoefficients));
      setStep(1);
      setUserInput('');
      setMessage('');
      setHint('');
      setLogShown(false);
    }
  };


  const showHint = () => {
    setHint(hintsArray[questionIndex] || 'Think about applying the power rule!');
  };


  return (<>
    <div className="main-content">
      <div className="step-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Back
        </button>
        <h1>Step-by-Step Differentiation</h1>
        <p>Differentiate the function step by step.</p>
        <h2>
          Given Function: {`${functionCoefficients[0]}x³ + ${functionCoefficients[1]}x² + ${functionCoefficients[2]}x + ${functionCoefficients[3]}`}
        </h2>
        <h3>{step === 1 ? "Find f'(x)" : "Find f''(x)"}</h3>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your answer"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button className="skip-button" onClick={nextQuestion}>
          Skip
        </button>
        <button className="hint-button" onClick={showHint}>
          Hint
        </button>
        <p className="message">{message}</p>
        <p className="hint">{hint}</p>
        <p>Question {questionIndex + 1} of 5</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(questionIndex + 1) * 20}%` }}></div>
        </div>
      </div>
    </div>
    <br></br>
    <div className="explanation">
  <h4>Guide on Answering the Questions:</h4>
  <p>Question Example: <strong>7x³ + 5x² - 2x + 3</strong></p>
  <h6>Please beware of the style of answers accepted!</h6>


  <div className="derivative-container">
    {/* First Derivative */}
    <div className="derivative-box">
      <h5>First Derivative:</h5>
      <ul>
        <li>21x² + 10x - 2</li><br></br>
        <li>OR</li>
       <br></br> <li>21x²+10x-2</li>
      </ul>
    </div>


    {/* Second Derivative */}
    <div className="derivative-box">
      <h5>Second Derivative:</h5>
      <ul>
      <li>42x + 10</li><br></br>
        <li>OR</li>
        <br></br><li>42x+10</li>
      </ul>
    </div>
  </div>
</div>


    </>
  );
};


export default CalGame3;




