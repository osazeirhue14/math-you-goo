import React, { useState, useEffect } from 'react';
import './P2.css';


const generateProblem = () => {
    const hasPOI = Math.random() < 0.5;
    let f, f_prime, f_double_prime, inflection_x = null;


    if (hasPOI) {
        const a = Math.floor(Math.random() * 4) + 1;
        const b = Math.floor(Math.random() * 6) - 3;
        f = `${a}x^3 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x^2`;
        f_prime = `${3 * a}x^2 ${b >= 0 ? `+ ${2 * b}` : `- ${Math.abs(2 * b)}`}x`;
        f_double_prime = `${6 * a}x ${b >= 0 ? `+ ${2 * b}` : `- ${Math.abs(2 * b)}`}`;
        if (6 * a !== 0) inflection_x = (-2 * b) / (6 * a);
    } else {
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 6) - 3;
        f = `${a}x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x`;
        f_prime = `${2 * a}x ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}`;
        f_double_prime = `${2 * a}`;
    }


    return { f, f_prime, f_double_prime, inflection_x, hasPOI };
};


const normalizeAnswer = (input) => input.replace(/\s+/g, '');


const P2 = () => {
    const [step, setStep] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [problem, setProblem] = useState(generateProblem());
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [progress, setProgress] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(1);


    useEffect(() => {
        const correctStep1 = problem.f_prime;
        const correctStep2 = problem.f_double_prime;
        let correctStep3 = problem.inflection_x !== null ? problem.inflection_x.toFixed(2) : "No solution";
        let correctStep4 = problem.hasPOI && problem.inflection_x !== null ? "Yes there is a POI" : "No there is not a POI";


        setCorrectAnswers([correctStep1, correctStep2, correctStep3, correctStep4]);


        console.clear();
        console.log(`✅ New Question: f(x) = ${problem.f}`);
        console.log(`🔹 Step 1 Answer: f'(x) = ${correctStep1}`);
        console.log(`🔹 Step 2 Answer: f''(x) = ${correctStep2}`);
        console.log(`🔹 Step 3 Answer: Solve f''(x) = 0 → ${correctStep3}`);
        console.log(`🔹 Step 4 Answer: ${correctStep4}`);
    }, [problem]);


    const handleSubmit = () => {
        if (normalizeAnswer(userInput.trim()) === normalizeAnswer(correctAnswers[step])) {
            setMessage('Correct! Move to the next step.');
            if (step < 3) {
                setStep(step + 1);
                setUserInput('');
            } else {
                setTimeout(() => nextQuestion(), 1000);
                setProgress((prev) => (questionIndex === 20 ? 0 : prev + 5));
            }
        } else {
            setMessage('Incorrect. Try again.');
        }
    };


    const nextQuestion = () => {
        setStep(0);
        setUserInput('');
        setMessage('');
        setProblem(generateProblem());
        setProgress((prev) => (questionIndex === 20 ? 0 : prev + 5));
        setQuestionIndex((prev) => (prev === 20 ? 1 : prev + 1));
    };


    return (
        <div>
            <div className="step-container">
                <button className="back-button" onClick={() => window.history.back()}>Back</button>
                <h1>Step-by-Step Inflection Point Game</h1>
                <h2>Function: f(x) = {problem.f}</h2>
                <h3>
                    {step === 0 ? "Find f'(x)" :
                     step === 1 ? "Find f''(x)" :
                     step === 2 ? "Solve f''(x) = 0" :
                     "Is there a POI?"}
                </h3>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter your answer"
                />
                <button onClick={handleSubmit}>Submit</button>
                <button className="skip-button" onClick={nextQuestion}>Skip</button>
               
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
                <p>Question {questionIndex} of 20</p>
               
                <p className="message">{message}</p>
                <p>Step {step + 1} of 4</p>
            </div>
   
    <div className="explanation">
      <h4>Guide on Answering the Questions:</h4>
      <p>Question Example: <strong>2x^2-1x</strong></p>
      <h6>Please beware of the style of answers accepted!</h6>


      <div className="derivative-container">
        <div className="derivative-box">
          <h5>First Derivative:</h5>
          <ul>
            <li>4x - 1</li>
          </ul>
        </div>


        <div className="derivative-box">
          <h5>Second Derivative:</h5>
          <ul>
            <li>4</li>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Solve F''(x) == 0</h5>
          <ul>
            <li>No Solution</li>
            <p>If you get an numerical answer for this put it to 2 decimal places.</p>
            <p>Eg. 0.67</p>
          </ul>
        </div>
        <div className="derivative-box2">
          <h5>Is there a Point of Inflection</h5>
          <ul>
            <li>No there is not a POI</li>
            <p>The answer for this either: 'Yes there is a POI' or 'No there is not a POI'.</p>
          </ul>
        </div>
      </div>
      </div>
    </div>
    );
   
};


export default P2;
