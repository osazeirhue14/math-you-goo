import React, { useState } from 'react';
import './Dot2.css';


const generateVectors = () => {
    return {
        u: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
        v: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
    };
};


const computeDotProduct = (u, v) => {
    return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
};


const Dot2 = () => {
    const [step, setStep] = useState(0);
    const [questionCount, setQuestionCount] = useState(1);
    const [userInput, setUserInput] = useState('');
    const [message, setMessage] = useState('');
    const [vectors, setVectors] = useState(generateVectors());
    const [correctSteps, setCorrectSteps] = useState([
        vectors.u[0] * vectors.v[0],
        vectors.u[1] * vectors.v[1],
        vectors.u[2] * vectors.v[2],
        computeDotProduct(vectors.u, vectors.v)
    ]);
    const [logRendered, setLogRendered] = useState(false);


    if (!logRendered) {
        console.clear();
        console.log(`\n--- Question ${questionCount} ---`);
        console.log(`Vectors: u = (${vectors.u.join(', ')}), v = (${vectors.v.join(', ')})`);
        console.log(`Step 1 Answer: ${correctSteps[0]}`);
        console.log(`Step 2 Answer: ${correctSteps[1]}`);
        console.log(`Step 3 Answer: ${correctSteps[2]}`);
        console.log(`Final Step Answer: ${correctSteps[3]}`);
        setLogRendered(true);
    }


    const handleSubmit = () => {
        if (parseInt(userInput) === correctSteps[step]) {
            setMessage('Correct! Move to the next step.');
            if (step < 3) {
                setStep(step + 1);
                setUserInput('');
            } else {
                setMessage('Great job! Moving to the next question.');
                nextQuestion();
            }
        } else {
            setMessage('Incorrect. Try again.');
        }
    };


    const nextQuestion = () => {
        if (questionCount < 20) {
            const newVectors = generateVectors();
            setVectors(newVectors);
            setCorrectSteps([
                newVectors.u[0] * newVectors.v[0],
                newVectors.u[1] * newVectors.v[1],
                newVectors.u[2] * newVectors.v[2],
                computeDotProduct(newVectors.u, newVectors.v)
            ]);
            setStep(0);
            setUserInput('');
            setMessage('');
            setLogRendered(false);
            setQuestionCount(questionCount + 1);
        } else {
            setMessage('You have completed all 20 questions!');
        }
    };


    return (<>
        <div className="step-container">
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
            <h1>Step-by-Step Dot Product</h1>
            <p>Compute the dot product step by step.</p>
            <h2>Vectors: u = ({vectors.u.join(', ')}) , v = ({vectors.v.join(', ')})</h2>
            <h3>{step < 3 ? `Step ${step + 1}: Multiply component ${step + 1}` : 'Final Step: Sum up the products'}</h3>
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your answer"
            />
            <button onClick={handleSubmit}>Submit</button>
            <button className="skip-button" onClick={nextQuestion}>Skip</button>
            <p className="message">{message}</p>
            <p>Step {step + 1} of 4</p>
            <div className="progress-bar">
                <div style={{ width: `${(questionCount / 20) * 100}%` }} className="progress"></div>
            </div>
            <p>Question {questionCount} of 20</p>
           
        </div>
        <div className="explanation">
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


export default Dot2;
