import './Dot1.css';
import React, { useState } from 'react';


const Dot1 = () => {
    const questions = [
        { question: "What is the dot product of (2,3) and (4,5)?", options: ["23", "22", "20", "25"], answer: "23" },
        { question: "If u = (1,2,3) and v = (4,5,6), what is u · v?", options: ["32", "34", "36", "30"], answer: "32" },
        { question: "If two vectors are perpendicular, what is their dot product?", options: ["0", "1", "-1", "Depends on magnitude"], answer: "0" },
        { question: "What is the dot product of (3,4,5) and (2,0,-1)?", options: ["1", "4", "3", "6"], answer: "1" },
        { question: "The dot product of (0,0,0) and any vector is?", options: ["0", "1", "Undefined", "Depends on the vector"], answer: "0" },
        { question: "If u · v = 0, what can be said about u and v?", options: ["They are parallel", "They are perpendicular", "They are identical", "Nothing specific"], answer: "They are perpendicular" },
        { question: "What is the dot product of (1,-2,3) and (-4,5,-6)?", options: ["-32", "30", "20", "-25"], answer: "-32" },
        { question: "What is the geometric interpretation of the dot product?", options: ["Projection", "Cross Product", "Determinant", "Magnitude"], answer: "Projection" },
        { question: "If ||u|| = 3, ||v|| = 4, and the angle between them is 90 degrees, what is u · v?", options: ["0", "12", "7", "None of the above"], answer: "0" },
        { question: "Which formula represents the dot product of u and v?", options: ["||u|| ||v|| cos(θ)", "||u|| ||v|| sin(θ)", "||u|| + ||v||", "||u|| - ||v||"], answer: "||u|| ||v|| cos(θ)" },
        { question: "The dot product of (a,b) and (c,d) is?", options: ["ac + bd", "ad + bc", "a/c + b/d", "None of the above"], answer: "ac + bd" },
        { question: "What is the dot product of (7,8) and (2,3)?", options: ["38", "37", "36", "39"], answer: "38" },
        { question: "The dot product is used to find the ____ between two vectors.", options: ["Angle", "Cross Product", "Magnitude", "Sum"], answer: "Angle" },
        { question: "If u = (2,3,4) and v = (1,0,-1), what is u · v?", options: ["-2", "3", "-4", "5"], answer: "-2" },
        { question: "The dot product is commutative. True or False?", options: ["True", "False"], answer: "True" }
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selected, setSelected] = useState(null);
    const [correct, setCorrect] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        setCorrect(option === questions[currentQuestion].answer);
    };

    const nextQuestion = () => {
        setSelected(null);
        setCorrect(null);
        setCurrentQuestion((prev) => (prev + 1) % questions.length);
    };

    return (
        <div className="calculus-game">
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
            <h1 className="text-xl font-bold mb-4">Dot Product Quiz</h1>
            <h2>{questions[currentQuestion].question}</h2>
            <div className="derivative-options">
                {questions[currentQuestion].options.map((opt, idx) => (
                    <button
                        key={idx}
                        className={selected === opt ? (correct ? 'correct' : 'incorrect') : ''}
                        onClick={() => handleSelect(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            {selected && (
                <p className={correct ? 'correct-message' : 'incorrect-message'}>
                    {correct ? "Correct! Go to the next question" : "Wrong answer! Try again"}
                </p>
            )}
            <button className="next-question" onClick={nextQuestion}>Next Question</button>
            <br></br>
        </div>
    );
};

export default Dot1;
