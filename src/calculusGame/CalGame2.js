import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import { evaluate } from 'mathjs';
import './CalGame2.css';
import FooterC from './FooterC';

const generateFunction = () => {
  const a = Math.floor(Math.random() * 21) - 10;
  const b = Math.floor(Math.random() * 21) - 10;
  const c = Math.floor(Math.random() * 21) - 10;
  const d = Math.floor(Math.random() * 21) - 10;
  return `${a}x^3 ${b < 0 ? "-" : "+"} ${Math.abs(b)}x^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}x ${d < 0 ? "-" : "+"} ${Math.abs(d)}`.replace(/\+ -/g, "- ");
};

const computeDerivatives = (funcStr) => {
  const regex = /([+-]?\d*)x\^?(\d*)/g;
  let match;
  let a = 0, b = 0, c = 0;

  while ((match = regex.exec(funcStr)) !== null) {
    const coefficient = match[1] === '' || match[1] === '+' ? 1 : (match[1] === '-' ? -1 : parseInt(match[1], 10));
    const power = match[2] ? parseInt(match[2], 10) : 1;

    if (power === 3) a = coefficient;
    else if (power === 2) b = coefficient;
    else if (power === 1) c = coefficient;
  }

  const formatExpression = (expr) => expr.replace(/\+ -/g, "- ").replace(/\b1x/g, "x");

  return {
    firstDerivative: formatExpression(`${3 * a}x^2 ${2 * b < 0 ? "-" : "+"} ${Math.abs(2 * b)}x ${c < 0 ? "-" : "-"} ${Math.abs(c)}`),
    secondDerivative: formatExpression(`${6 * a}x ${2 * b < 0 ? "-" : "+"} ${Math.abs(2 * b)}`)
  };
};

const normalizeAnswer = (input) => {
  return input.replace(/\s+/g, '').replace(/\*+/g, '').replace(/\+\-/g, '-');
};

const evaluateFunction = (func, xValues) => {
  try {
    const y = xValues.map(val => evaluate(func.replace(/\*/g, ''), { x: val }));
    return { x: xValues, y };
  } catch (e) {
    console.error("Error evaluating function:", e);
    return { x: [], y: [] };
  }
};

const CalGame2 = () => {
  const navigate = useNavigate();
  const [currentFunction, setCurrentFunction] = useState(generateFunction());
  const [userFirstDerivative, setUserFirstDerivative] = useState('');
  const [userSecondDerivative, setUserSecondDerivative] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [graphData, setGraphData] = useState({ x: [], y: [] });

  useEffect(() => {
    const { firstDerivative, secondDerivative } = computeDerivatives(currentFunction);
    const xValues = Array.from({ length: 50 }, (_, i) => (i - 25) / 2);
    const evaluatedData = evaluateFunction(currentFunction, xValues);
    setGraphData(evaluatedData);
    console.clear();
    console.log(`Question: ${currentFunction}`);
    console.log(`First Derivative: ${firstDerivative}`);
    console.log(`Second Derivative: ${secondDerivative}`);
    console.log("Graph Data:", evaluatedData);
  }, [currentFunction]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleSubmit = () => {
    const { firstDerivative, secondDerivative } = computeDerivatives(currentFunction);
    let points = 0;
    if (normalizeAnswer(userFirstDerivative) === normalizeAnswer(firstDerivative)) points += 2;
    if (normalizeAnswer(userSecondDerivative) === normalizeAnswer(secondDerivative)) points += 3;
    setScore(score + points);
    setCurrentFunction(generateFunction());
    setUserFirstDerivative('');
    setUserSecondDerivative('');
  };

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(180);
    setCurrentFunction(generateFunction());
    setUserFirstDerivative('');
    setUserSecondDerivative('');
  };

  return (
    <>
      <div className="container">
        <button className="back-button" onClick={() => navigate('/DifferentialCalculus')}>Back</button>
        <h1>Differential Calculus Game</h1>
        <p>Enter answers in standard algebraic notation.</p>
        <div className="graph-container">
          <Plot
            data={[{
              x: graphData.x,
              y: graphData.y,
              type: 'scatter',
              mode: 'lines',
              line: { color: 'blue' }
            }]}
            layout={{
              title: 'Graph of f(x)',
              xaxis: { title: 'x' },
              yaxis: { title: 'f(x)' },
              autosize: true
            }}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="timer-box">Timer: {timeLeft}s</div>
        {timeLeft > 0 ? (
          <>
            <h3>Question: {currentFunction}</h3>
            <input type="text" value={userFirstDerivative} onChange={(e) => setUserFirstDerivative(e.target.value)} placeholder="First Derivative" />
            <input type="text" value={userSecondDerivative} onChange={(e) => setUserSecondDerivative(e.target.value)} placeholder="Second Derivative" />
            <button onClick={handleSubmit}>Submit</button>
          </>
        ) : (
          <>
            <h3>Time's Up!</h3>
            <p>Your Score: {score}</p>
            <button onClick={handleRestart}>Try Again</button>
          </>
        )}
        <h3>Score: {score}</h3>
      </div>
      <div className="explanation">
        <p>For every correct First Derivative you get 2 points, for every correct Second Derivative you get 3 points.</p>
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

export default CalGame2;

