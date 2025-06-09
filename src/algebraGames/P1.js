import './P1.css';
import React, { useState } from 'react';

const P1 = () => {
    const questions = [
        { question: "What is a point of inflection?", options: ["Where f'(x) = 0", "Where f''(x) changes sign", "Where f(x) = 0", "Where f'(x) is undefined"], answer: "Where f''(x) changes sign" },
        { question: "If f''(x) > 0 for all x, what can be said about f(x)?", options: ["Concave up everywhere", "Concave down everywhere", "Has a point of inflection", "Has a local maximum"], answer: "Concave up everywhere" },
        { question: "Which condition must hold at a point of inflection?", options: ["f'(x) = 0", "f''(x) = 0 or undefined and sign change", "f''(x) > 0", "f'(x) is undefined"], answer: "f''(x) = 0 or undefined and sign change" },
        { question: "What is the second derivative of f(x) = x^3?", options: ["6x", "3x^2", "2x", "x"], answer: "6x" },
        { question: "At what x-values does f(x) = x^3 - 3x have inflection points?", options: ["x = 1", "x = 0", "x = -1,1", "x = -3,3"], answer: "x = 0" },
        { question: "If f''(x) changes from negative to positive at x = a, what does this mean?", options: ["Local minimum", "Local maximum", "Point of inflection", "No conclusion"], answer: "Point of inflection" },
        { question: "Which of these functions has no points of inflection?", options: ["x^4", "x^3", "x^5", "x^7"], answer: "x^4" },
        { question: "If f''(x) = 12x, what are the inflection points?", options: ["x = 12", "x = 0", "x = -12, 12", "No inflection points"], answer: "x = 0" },
        { question: "What does it mean if f''(x) is always positive?", options: ["Concave up everywhere", "Concave down everywhere", "Has inflection points", "Has local maximum"], answer: "Concave up everywhere" },
        { question: "For f(x) = x^4 - 4x^3, find possible inflection points.", options: ["x = 0", "x = 3", "x = 2", "x = 4"], answer: "x = 3" },
        { question: "Which test confirms a point of inflection?", options: ["First derivative test", "Second derivative test", "Concavity test", "Limit test"], answer: "Concavity test" },
        { question: "If f''(x) does not exist at x = a, can x = a be a point of inflection?", options: ["Yes, if f''(x) changes sign", "No", "Only if f'(x) = 0", "Only if f(x) = 0"], answer: "Yes, if f''(x) changes sign" },
        { question: "If f''(x) changes from positive to negative, what does this indicate?", options: ["Point of inflection", "Local maximum", "Local minimum", "Increasing function"], answer: "Point of inflection" },
        { question: "What is the second derivative of f(x) = x^5 - 5x^3?", options: ["20x^3 - 30x", "5x^4 - 15x^2", "15x^2 - 30x", "10x^4 - 15x^2"], answer: "20x^3 - 30x" },
        { question: "Where does f(x) = sin(x) have inflection points?", options: ["x = 0", "x = pi, 2pi, 3pi", "x = pi/2, 3pi/2", "x = 2pi, 4pi"], answer: "x = pi, 2pi, 3pi" },
        { question: "How many inflection points does f(x) = x^4 have?", options: ["0", "1", "2", "Infinitely many"], answer: "0" },
        { question: "If f''(x) = e^x, does f(x) have inflection points?", options: ["Yes", "No", "Only at x = 0", "Only for x > 0"], answer: "No" },
        { question: "Which of these functions is always concave up?", options: ["e^x", "ln(x)", "x^3", "sin(x)"], answer: "e^x" },
        { question: "What is the second derivative of f(x) = cos(x)?", options: ["-cos(x)", "-sin(x)", "sin(x)", "cos(x)"], answer: "-cos(x)" },
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
            <h1 className="text-xl font-bold mb-4">Points of Inflection Quiz</h1>
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
        </div>
    );
};

export default P1;
