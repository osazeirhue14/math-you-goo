import './CalGame.css';
import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { generateFunction, computeDerivatives } from './utils';
import FooterC from './FooterC';

const CalGame1 = () => {
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState({ first: [], second: [] });
    const [selected, setSelected] = useState({ first: null, second: null });
    const [correct, setCorrect] = useState({ first: null, second: null });
    const [graphData, setGraphData] = useState({ x: [], y: [] });

    useEffect(() => {
        generateQuestion();
    }, []);

    const generateQuestion = () => {
        const func = generateFunction();
        console.log("Generated Function:", func);

        const { firstDerivative, secondDerivative } = computeDerivatives(func);

        const generateOptions = (correctAnswer) => {
            let options = new Set([correctAnswer]);
            while (options.size < 4) {
                let randCoeff = Math.floor(Math.random() * 20) - 10;
                let randPower = Math.floor(Math.random() * 4) + 1;
                let randOption = `${randCoeff}x^${randPower}`;
                options.add(randOption);
            }
            return Array.from(options).sort(() => Math.random() - 0.5);
        };

        setQuestion(func);
        setOptions({
            first: generateOptions(firstDerivative),
            second: generateOptions(secondDerivative)
        });
        setSelected({ first: null, second: null });
        setCorrect({ first: null, second: null });

        setGraphData(generateGraphData(func));
    };

    const handleSelect = (type, option) => {
        if (!question) return;
        const { firstDerivative, secondDerivative } = computeDerivatives(question);
        const isCorrect = type === 'first' ? option === firstDerivative : option === secondDerivative;
        setSelected(prev => ({ ...prev, [type]: option }));
        setCorrect(prev => ({ ...prev, [type]: isCorrect }));
    };

    const generateGraphData = (func) => {
        if (!func) return { x: [], y: [] };

        console.log("Function received for graphing:", func);

        // Create x values range
        const xValues = Array.from({ length: 100 }, (_, i) => (i - 50) / 10); // Range from -5 to 5

        // Function evaluator
        const evaluateFunction = (x) => {
            try {
                return Function("x", `return ${func.replace(/\^/g, "**")}`)(x);
            } catch (error) {
                console.error("Error evaluating function:", error);
                return NaN;
            }
        };

        // Calculate y values
        const yValues = xValues.map(evaluateFunction);

        // Filter out NaN values
        const validData = xValues.map((x, i) => ({ x, y: yValues[i] })).filter(point => !isNaN(point.y));

        console.log("Graph Data:", validData);

        return {
            x: validData.map(point => point.x),
            y: validData.map(point => point.y),
        };
    };

    return (
        <div className="calculus-game">
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
            <h1 className="text-xl font-bold mb-4">Find the First and Second Derivatives</h1>

            {question && (
                <>
                    <h2 className="font-bold text-lg">Function: {question}</h2>

                    {/* Plotly Graph */}
                    <div className="plot-container">
                        {graphData.x.length > 0 ? (
                            <Plot
                                data={[
                                    {
                                        x: graphData.x,
                                        y: graphData.y,
                                        type: 'scatter',
                                        mode: 'lines',
                                        marker: { color: 'blue' },
                                    }
                                ]}
                                layout={{
                                    title: `Graph of ${question}`,
                                    width: 600,
                                    height: 450
                                }}
                            />
                        ) : (
                            <p className="text-red-500">Graph could not be plotted. Check console for errors.</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <h2 className="font-semibold">First Derivative:</h2>
                        <div className="derivative-options">
                            {options.first.map((opt, idx) => (
                                <button key={idx} className={selected.first === opt ? (correct.first ? 'correct' : 'incorrect') : ''} onClick={() => handleSelect('first', opt)}>{opt}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="font-semibold">Second Derivative:</h2>
                        <div className="derivative-options">
                            {options.second.map((opt, idx) => (
                                <button key={idx} className={selected.second === opt ? (correct.second ? 'correct' : 'incorrect') : ''} onClick={() => handleSelect('second', opt)}>{opt}</button>
                            ))}
                        </div>
                    </div>

                    <button className="next-question" onClick={generateQuestion}>Next Question</button>
                </>
            )}

            <br />
            
        </div>
    );
};

export default CalGame1;

