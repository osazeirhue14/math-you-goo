import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dot3.css'; // Reusing the same CSS


// Utility to generate random vectors
const generateVectors = () => {
  const vectorA = [
    Math.floor(Math.random() * 21) - 10,
    Math.floor(Math.random() * 21) - 10,
    Math.floor(Math.random() * 21) - 10
  ];


  const vectorB = [
    Math.floor(Math.random() * 21) - 10,
    Math.floor(Math.random() * 21) - 10,
    Math.floor(Math.random() * 21) - 10
  ];


  return { vectorA, vectorB };
};


// Compute dot product
const computeDotProduct = (vectorA, vectorB) => {
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1] + vectorA[2] * vectorB[2];
};


const Dot3 = () => {
  const [vectors, setVectors] = useState(generateVectors());
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timeUp, setTimeUp] = useState(false);
  const navigate = useNavigate();


  const correctAnswer = computeDotProduct(vectors.vectorA, vectors.vectorB);
 
  // Console log the correct answer for debugging
  useEffect(() => {
    console.clear();
    console.log(`Vectors: A = (${vectors.vectorA.join(', ')}), B = (${vectors.vectorB.join(', ')})`);
    console.log(`Correct Answer: ${correctAnswer}`);
  }, [vectors]);


  // Handle submission
  const handleSubmit = () => {
    if (parseInt(userAnswer, 10) === correctAnswer) {
      setScore(score + 3);
    }
    setUserAnswer('');
    setVectors(generateVectors());
  };


  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !timeUp) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeUp(true);
    }
  }, [timeLeft, timeUp]);


  const handleRestart = () => {
    setScore(0);
    setTimeLeft(180);
    setTimeUp(false);
    setUserAnswer('');
    setVectors(generateVectors());
  };


  return (<>
    <div className="container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
      <h1>Dot Product Time Challenge</h1>
      <p>Find the dot product of the following vectors:</p>
      <h3>A = ({vectors.vectorA.join(', ')})</h3>
      <h3>B = ({vectors.vectorB.join(', ')})</h3>


      <div className="timer-box">Timer: {timeLeft} seconds</div>


      {!timeUp ? (
        <div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter dot product"
          />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div>
          <h3>Time's Up!</h3>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      )}


      <h3>Score: {score}</h3>
    </div>
      <div className="explanation">
        <p>For every correct answer you'll be awarded 3 points.</p>
      <h4>Guide on Answering the Questions:</h4>
      <p>Question Example: <strong>u =(7,1,7) and v =(1,2,1)</strong></p>
      <h6>Please beware of the style of answers accepted!</h6>


      <div className="derivative-container">
        <div className="derivative-box">
          <h5>Multiply Component 1</h5>
          <ul>
            <li>7 * 1 = 7</li>
          </ul>
        </div>


        <div className="derivative-box">
          <h5>Multiply Component 2</h5>
          <ul>
            <li>1 * 2 = 2</li>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Multiply Component 3</h5>
          <ul>
            <li>7 * 1 = 7</li>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Add all 3 Components</h5>
          <ul>
            <li>7 + 2 + 7 = 16</li>
          </ul>
        </div>
      </div>
      </div>
      </>
  );
};


export default Dot3;
