import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import './ChainGame3.css';


const generateRandomFunction = () => {
  const a = Math.floor(Math.random() * 5) + 1;
  const b = Math.floor(Math.random() * 5) + 1;
  const c = Math.floor(Math.random() * 5) + 1;
  const n = Math.floor(Math.random() * 4) + 2;
  return `${a}(${b}x+${c})^${n}`;
};


const computeDerivatives = (func) => {
  const parts = func.match(/(\d+)\((\d+)x\+(\d+)\)\^(\d+)/);
  if (parts) {
    const a = parseInt(parts[1]);
    const b = parseInt(parts[2]);
    const c = parseInt(parts[3]);
    const n = parseInt(parts[4]);
    const outerCoefficient = a * n;
    const innerDerivative = b;
    const newExp = n - 1;
   
    const outerDerivative = newExp === 1
      ? `${outerCoefficient}(${b}x+${c})`
      : `${outerCoefficient}(${b}x+${c})^${newExp}`;
   
    const finalAnswer = newExp === 1
      ? `${outerCoefficient * innerDerivative}(${b}x+${c})`
      : `${outerCoefficient * innerDerivative}(${b}x+${c})^${newExp}`;
   
    return { outerDerivative, innerDerivative: innerDerivative.toString(), finalAnswer };
  }
  return { outerDerivative: '', innerDerivative: '', finalAnswer: '' };
};


const evaluateFunction = (func, xValues) => {
  const parts = func.match(/(\d+)\((\d+)x\+(\d+)\)\^(\d+)/);
  if (!parts) return { x: [], y: [] };


  const a = parseInt(parts[1]);
  const b = parseInt(parts[2]);
  const c = parseInt(parts[3]);
  const n = parseInt(parts[4]);


  const x = xValues;
  const y = x.map(val => a * Math.pow((b * val + c), n));


  return { x, y };
};


const ChainGame3 = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(generateRandomFunction());
  const [outerDerivative, setOuterDerivative] = useState('');
  const [innerDerivative, setInnerDerivative] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userOuter, setUserOuter] = useState('');
  const [userInner, setUserInner] = useState('');
  const [userFinal, setUserFinal] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [graphData, setGraphData] = useState({ x: [], y: [] });


  useEffect(() => {
    const { outerDerivative, innerDerivative, finalAnswer } = computeDerivatives(question);
    setOuterDerivative(outerDerivative);
    setInnerDerivative(innerDerivative);
    setCorrectAnswer(finalAnswer);
    console.clear();
    console.log(`Question: ${question} | Outer: ${outerDerivative} | Inner: ${innerDerivative} | Final: ${finalAnswer}`);


    const xValues = Array.from({ length: 50 }, (_, i) => (i - 25) / 2);
    setGraphData(evaluateFunction(question, xValues));
  }, [question]);


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);


  const handleSubmit = () => {
    let points = 0;
    if (userOuter === outerDerivative) points += 1;
    if (userInner === innerDerivative) points += 1;
    if (userFinal === correctAnswer) points += 1;
   
    setScore(score + points);
    setMessage(`You earned ${points} points! Here’s a new question.`);
    setQuestion(generateRandomFunction());
    setUserOuter('');
    setUserInner('');
    setUserFinal('');
  };


  const handleRestart = () => {
    setScore(0);
    setTimeLeft(180);
    setMessage('');
    setQuestion(generateRandomFunction());
    setUserOuter('');
    setUserInner('');
    setUserFinal('');
  };


  return (<>
    <div className="game-container">
      <button className="back-button" onClick={() => navigate('/DifferentialCalculus')}>Back</button>
      <h1>Timed Chain Rule Challenge</h1>
      <h2>Time Left: {timeLeft}s</h2>
      <h2>Score: {score}</h2>
      <h3>Differentiate: {question}</h3>


      <div className="plot-container">
      <Plot
          data={[
            {
              x: graphData.x,
              y: graphData.y,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'blue' },
            },
          ]}
          layout={{ title: 'Graph of f(x)', xaxis: { title: 'x' }, yaxis: { title: 'f(x)' } }}
        />
      </div>
      <input type="text" value={userOuter} onChange={(e) => setUserOuter(e.target.value)} placeholder="Outer Derivative" />
      <input type="text" value={userInner} onChange={(e) => setUserInner(e.target.value)} placeholder="Inner Derivative" />
      <input type="text" value={userFinal} onChange={(e) => setUserFinal(e.target.value)} placeholder="Final Answer" />
      <br></br><button onClick={handleSubmit} disabled={timeLeft === 0}>Submit</button>
      <p className="message">{message}</p>
      {timeLeft === 0 && <h2>Time's up! Final Score: {score}</h2>}
      <button className="restart-button" onClick={handleRestart}>Restart</button>
    </div>
    <div className="explanation">
      <p>1 point for correct Outer Derivative, 1 point for correct Inner Derivative, 1 point for correct Final Answer</p>
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


export default ChainGame3;




