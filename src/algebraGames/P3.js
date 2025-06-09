import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dot3.css';


const generateProblem = () => {
    const hasPOI = Math.random() < 0.6;
    let f, f_prime, f_double_prime, inflection_x = null;


    if (hasPOI) {
        const a = Math.floor(Math.random() * 4) + 1;
        const b = Math.floor(Math.random() * 6) - 3;
        f = `${a}x^3 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x^2`;
        f_prime = `${3 * a}x^2 ${b >= 0 ? `+ ${2 * b}` : `- ${Math.abs(2 * b)}`}x`;
        f_double_prime = `${6 * a}x ${b >= 0 ? `+ ${2 * b}` : `- ${Math.abs(2 * b)}`}`;
        if (6 * a !== 0) {
            inflection_x = (-2 * b) / (6 * a);
        }
    } else {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 6) - 3;
        f = `${a}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x`;
        f_prime = `${2 * a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}`;
        f_double_prime = `${2 * a}`;
    }


    return { f, f_prime, f_double_prime, inflection_x, hasPOI };
};


const normalizeAnswer = (answer) => {
    return answer.replace(/\s+/g, '').toLowerCase();
};


const evaluate = (expression, x) => {
    try {
        const formattedExpression = expression.replace(/(\d)(x)/g, '$1*$2').replace(/x/g, `(${x})`);
        return eval(formattedExpression);
    } catch (error) {
        console.error(`Error evaluating expression: ${expression}`, error);
        return NaN;
    }
};


const P3 = () => {
    const [problem, setProblem] = useState(generateProblem());
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(180);
    const [timeUp, setTimeUp] = useState(false);
    const [step, setStep] = useState(0);
    const navigate = useNavigate();


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


    const questions = [
        "Find the first derivative f'(x)",
        "Find the second derivative f''(x)",
        "Solve f''(x) = 0 for x",
        "Does this function have a POI? (Yes/No)",
        "If there is a POI, provide its coordinates (x, y)"
    ];


    const hasPOI = problem.hasPOI && problem.inflection_x !== null &&
        !isNaN(evaluate(problem.f_double_prime, problem.inflection_x + 1)) &&
        !isNaN(evaluate(problem.f_double_prime, problem.inflection_x - 1)) &&
        Math.sign(evaluate(problem.f_double_prime, problem.inflection_x + 1)) !==
        Math.sign(evaluate(problem.f_double_prime, problem.inflection_x - 1));


    const correctAnswers = [
        normalizeAnswer(problem.f_prime),
        normalizeAnswer(problem.f_double_prime),
        problem.hasPOI ? `${problem.inflection_x.toFixed(2)}` : "No solution",
        hasPOI ? "Yes" : "No",
        hasPOI ? `(${problem.inflection_x.toFixed(2)}, ${evaluate(problem.f, problem.inflection_x).toFixed(2)})` : "NA"
    ];


    useEffect(() => {
        console.clear();  
        console.log(`\n--- New Question ---`);
        console.log(`Function: f(x) = ${problem.f}`);
        console.log(`First Derivative: f'(x) = ${problem.f_prime}`);
        console.log(`Second Derivative: f''(x) = ${problem.f_double_prime}`);
        console.log(`Inflection Point X: ${problem.inflection_x !== null ? problem.inflection_x.toFixed(2) : "No solution"}`);
        console.log(`Has POI: ${hasPOI ? 'Yes' : 'No'}`);
        console.log(`POI Coordinates: ${correctAnswers[4]}`);
    }, [problem]);


    const handleSubmit = () => {
        if (normalizeAnswer(userInput) === normalizeAnswer(correctAnswers[step])) {
            setScore(score + 5);
            setUserInput('');
           
            if (step === correctAnswers.length - 1) {
                setProblem(generateProblem());
                setStep(0);
            } else {
                setStep(step + 1);
            }
        }
    };


    const handleSkipPart = () => {
        if (step < correctAnswers.length - 1) {
            setStep(step + 1);
        }
    };


    const handleSkipQuestion = () => {
        setProblem(generateProblem());
        setStep(0);
    };


    const handleRestart = () => {
        setScore(0);
        setTimeLeft(180);
        setTimeUp(false);
        setUserInput('');
        setProblem(generateProblem());
        setStep(0);
    };


    return (
        <div className="container">
            <button className="back-button" onClick={() => navigate('/LinearAlgebra')}>Back</button>
            <h1>POI Timed Challenge</h1>
            <h2>Function: f(x) = {problem.f}</h2>
            <div className="timer-box">Timer: {timeLeft} seconds</div>
            <div className="progress-bar">
                <div style={{ width: `${(step / correctAnswers.length) * 100}%` }} className="progress"></div>
            </div>
            <p><strong>Question:</strong> {questions[step]}</p>
            <p>Step {step + 1} of {correctAnswers.length}</p>
            {!timeUp ? (
                <div>
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your answer"
                    />
                    <br />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleSkipPart}>Skip Part</button>
                    <button onClick={handleSkipQuestion}>Skip Question</button>
                </div>
            ) : (
                <div>
                    <h3>Time's Up!</h3>
                    <p>Your Score: {score}</p>
                    <button onClick={handleRestart}>Try Again</button>
                </div>
            )}
            <h3>Score: {score}</h3>
            <div className="explanation">
                <p>For every correct answer you'll be awarded 5 points!</p>
      <h4>Guide on Answering the Questions:</h4>
      <p>Question Example: <strong>3x^3 + 2x^2</strong></p>
      <h6>Please beware of the style of answers accepted!</h6>


      <div className="derivative-container">
        <div className="derivative-box">
          <h5>First Derivative:</h5>
          <ul>
            <li>9x^2 + 4x</li>
          </ul>
        </div>


        <div className="derivative-box">
          <h5>Second Derivative:</h5>
          <ul>
            <li>18x + 4</li>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Solve F''(x) == 0</h5>
          <ul>
            <li>-0.22</li><br></br>
            <li>Is there an inflection Point?</li>
            <p>If you get an numerical answer for this put it to 2 decimal places. If there's no solution just leave the answer as 'No solution'. </p>
            <p>Eg. 0.67</p>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Is there a Point of Inflection:</h5>
          <ul>
            <li>Yes</li>
            <p>The answer for this either: 'Yes' or 'No'.</p>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>POI Coordinaties</h5>
          <ul>
            <li>(-0.22, 0.00)</li>
            <p>If there's no POI put the answer as NA, you'll still get the correct answer.</p>
          </ul>
        </div>
      </div>
      </div>
        </div>
    );
};


export default P3;




