import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import './ChainGame1.css';
import FooterC from './FooterC';

const generateQuestion = () => {
    const a = Math.floor(Math.random() * 6) + 2;  // Outer exponent (2-7)
    const b = Math.floor(Math.random() * 9) + 2;  // Coefficient of x (2-10)
    const c = Math.floor(Math.random() * 11) - 5; // Constant (-5 to 5)

    const question = `Find d/dx of f(x) = (${b}x + ${c})^${a}`;
    const correctAnswer = `${a * b}(${b}x + ${c})^${a - 1}`;

    const incorrect1 = `${a}(${b}x + ${c})^${a - 1}`;
    const incorrect2 = `${b}(${b}x + ${c})^${a}`;
    const incorrect3 = `${a * (b + 1)}(${b}x + ${c})^${a - 1}`;

    const options = [correctAnswer, incorrect1, incorrect2, incorrect3].sort(() => Math.random() - 0.5);

    return { question, options, correctAnswer, a, b, c };
};

const ChainGame1 = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    useEffect(() => {
        const { a, b, c } = currentQuestion;
        const xValues = Array.from({ length: 100 }, (_, i) => (i - 50) / 10);
        const yValues = xValues.map(x => {
            const value = b * x + c;
            return value >= 0 ? Math.pow(value, a) : NaN; // Avoid invalid math operations
        });

        setGraphData({ x: xValues, y: yValues });
    }, [currentQuestion]);

    const handleAnswer = (option) => {
        setSelectedOption(option);
        setIsCorrect(option === currentQuestion.correctAnswer);
    };

    const nextQuestion = () => {
        setCurrentQuestion(generateQuestion());
        setSelectedOption(null);
        setIsCorrect(null);
    };

    return (
        <div className="calculus-game">
            <button className="back-button" onClick={() => navigate('/DifferentialCalculus')}>Back</button>
            <h1>Chain Rule Quiz</h1>
            <p className="question">{currentQuestion.question}</p>

            {/* Plotly Graph */}
            <div className="plot-container">
                {graphData.x.length > 0 && (
                    <Plot
                        data={[
                            {
                                x: graphData.x,
                                y: graphData.y,
                                type: 'scatter',
                                mode: 'lines',
                                line: { color: 'blue' },
                                name: `f(x) = (${currentQuestion.b}x + ${currentQuestion.c})^${currentQuestion.a}`
                            }
                        ]}
                        layout={{
                            title: 'Graph of f(x)',
                            xaxis: { title: 'x' },
                            yaxis: { title: 'f(x)' },
                            width: 500,
                            height: 400
                        }}
                    />
                )}
            </div>

            <div className="derivative-options">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-box ${selectedOption === option ? (isCorrect ? "correct" : "incorrect") : ""}`}
                        onClick={() => handleAnswer(option)}
                        disabled={selectedOption !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {selectedOption && (
                <p className="feedback">{isCorrect ? "Correct!" : "Incorrect. Try the next one!"}</p>
            )}

            <button className="next-question" onClick={nextQuestion}>Next Question</button>
        </div>
    );
};

export default ChainGame1;

