import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';
import './list.css'; // Import CSS

function LinearAlgebra() {
  const navigate = useNavigate();
  const [showInflection, setShowInflection] = useState(false);
  const [generatedFunction, setGeneratedFunction] = useState(null);
  const [inflectionResult, setInflectionResult] = useState(null);
  const [inflectionExplanation, setInflectionExplanation] = useState(null);
  
  const gotogame1 = () => {
    window.location.href = '/Dot1';
  };
  const gotogame2 = () => {
    window.location.href = '/Dot2';
  };
  const gotogame3 = () => {
    window.location.href = '/Dot3';
  };
  const gotogame4 = () => {
    window.location.href = '/P1';
  };
  const gotogame5 = () => {
    window.location.href = '/P2';
  };
  const gotogame6 = () => {
    window.location.href = '/P3';
  };
  
  const handleSelect = (option) => {
    switch (option) {
      case 'Home':
        navigate('/Home');
        break;
      case 'Differential Calculus':
        navigate('/DifferentialCalculus');
        break;
      case 'Help':
        navigate('/Help');
        break;
      case 'Account':
        navigate('/Account');
        break;
      case 'Linear Algebra':
        navigate('/LinearAlgebra');
        break;
      case 'Contact':
        navigate('/Contact');
        break;
      case 'Logout':
        navigate('/Logout');
        break;
      case 'Review':
        navigate('/Review');
        break;
      default:
        break;
    }
  };

  const generateFunction = () => {
    const functions = [
      { func: 'x^3', secondDerivative: '6x', type: '1' },
      { func: 'x^5', secondDerivative: '20x^3', type: '1' },
      { func: 'x^3 - 3x', secondDerivative: '6x', type: '1' },
      { func: 'x^3 + 2x', secondDerivative: '6x', type: '1' },
      { func: 'x^5 - x^2', secondDerivative: '20x^3 - 2', type: '1' },
      { func: 'x^3 - 4x', secondDerivative: '6x', type: '1' },
      { func: 'x^5 - 2x', secondDerivative: '20x^3 - 2', type: '1' },
      { func: 'x^3 - x', secondDerivative: '6x', type: '1' },
      { func: 'x^4 - 4x^2', secondDerivative: '12x^2 - 8', type: 'multiple' },
      { func: 'x^6 - 6x^4 + 9x^2', secondDerivative: '30x^4 - 48x^2 + 18', type: 'multiple' },
      { func: 'x^5 - 5x^3 + 4x', secondDerivative: '20x^3 - 30x', type: 'multiple' },
      { func: 'x^6 - x^4', secondDerivative: '30x^4 - 12x^2', type: 'multiple' },
      { func: 'x^8 - 4x^6 + x^4', secondDerivative: '56x^6 - 120x^4 + 12x^2', type: 'multiple' },
      { func: 'x^7 - 3x^5 + x^3', secondDerivative: '42x^5 - 60x^3 + 6x', type: 'multiple' },
      { func: 'x^4 - 5x^2 + 4', secondDerivative: '12x^2 - 10', type: 'multiple' },
      { func: 'x^6 - 3x^4 + 2x^2', secondDerivative: '30x^4 - 36x^2 + 4', type: 'multiple' },
      { func: 'x^2', secondDerivative: '2', type: 'none' },
      { func: 'x^4', secondDerivative: '12x^2', type: 'none' },
      { func: 'e^x', secondDerivative: 'e^x', type: 'none' },
      { func: 'x^6', secondDerivative: '30x^4', type: 'none' },
      { func: 'ln(x)', secondDerivative: '-1/x^2', type: 'none' },
      { func: 'sin(x)', secondDerivative: '-sin(x)', type: 'none' },
      { func: 'cos(x)', secondDerivative: '-cos(x)', type: 'none' },
      { func: 'x^8', secondDerivative: '56x^6', type: 'none' }
    ];
    const randomFunc = functions[Math.floor(Math.random() * functions.length)];
    setGeneratedFunction(randomFunc);
    setInflectionResult(null);
    setInflectionExplanation(null);
  };

  const checkInflectionPoints = () => {
    if (!generatedFunction) return;
    
    if (generatedFunction.type === '1') {
      setInflectionResult('1 Point of Inflection');
      setInflectionExplanation('A point of inflection occurs where the second derivative changes sign. Since the second derivative of this function has a single root where sign changes, it has exactly one point of inflection.');
    } else if (generatedFunction.type === 'multiple') {
      setInflectionResult('Multiple Points of Inflection');
      setInflectionExplanation('The second derivative of this function has multiple roots where the sign changes, meaning multiple points of inflection exist.');
    } else {
      setInflectionResult('No Points of Inflection');
      setInflectionExplanation('The second derivative of this function does not change sign, meaning there are no points of inflection.');
    }
  };

  return (
    <>
      <img 
        src={logo} 
        alt="Math Yoo Goo Logo"
        style={{
          position: 'absolute',
          top: '110px',
          left: '40px',
          width: '120px',
          height: '120px',
          zIndex: 1100 
        }} 
      />
      <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <p>Welcome to Math-you-goo's Linear Algebra section, here you can learn and put your skills to the test with many different games and challenges, enjoy!</p>
        <h2>Linear Algebra</h2>
        <h3>Points of inflection</h3>
        <h4>Finding Points of Inflection Between Pairs of Lines</h4>
          <p>
            A point of inflection occurs where the curvature of a function changes sign. However, for pairs of straight lines,
            there is no point of inflection because lines have a constant second derivative of zero, meaning no change in concavity.
          </p>
          <p>
            If you're analyzing curves instead of straight lines, you can determine points of inflection using the second derivative test:
          </p>
          <ul class="centered-list">
            <li>Find the second derivative of the function, f''(x).</li>
            <li>Set f''(x) = 0 and solve for x.</li>
            <li>Check if f''(x) changes sign around the found points to confirm an inflection point.</li>
          </ul>
          <p>
            If f''(x) changes from positive to negative or vice versa, then the function has an inflection point at that x-value.
          </p>
          <p>Substitute 1 and -1 reaspectively ino the second derivative, if the signs are the same, there's no POI, if the signs are different there is a POI</p>
        
        <button onClick={generateFunction} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
          Generate Function
        </button>
        {generatedFunction && (
          <p style={{ marginTop: '10px' }}><strong>Generated Function:</strong> f(x) = {generatedFunction.func}</p>
        )}
        
        <button onClick={checkInflectionPoints} style={{ marginTop: '10px', padding: '10px', color: 'white', backgroundColor: 'green', fontSize: '16px' }}>
        Check for Inflection Points
      </button>
        {inflectionResult && (
          <div style={{ marginTop: '10px' }}>
            <p><strong>Inflection Points:</strong> {inflectionResult}</p>
            <p><strong>Explanation:</strong> {inflectionExplanation}</p>
          </div>
        )}
      </div>
      <br>
      </br>

      <p>Ready for a few questions yourself? try a few below.</p>
      <div style={{ marginBottom: '10px' }}>
  <button onClick={gotogame4}>Let's try a multiple choice game to put your new profound skills to work!</button>
</div>
<div style={{ marginBottom: '10px' }}>
  <button onClick={gotogame5} >Let's walk through a Step by Step Style here!</button>
</div>
<div style={{ marginBottom: '10px' }}>
  <button onClick={gotogame6} >Too Easy? Let's try some tougher questions here!</button>
</div>
<hr></hr>
<h3>Dot Product</h3>
<div style={{ }}>
<p>The dot product of two vectors is a scalar value obtained by multiplying corresponding components of two vectors and summing the results. It is widely used in physics, computer graphics, and machine learning.</p>
        <p>Formula: If **A = (a₁, a₂, ..., aₙ)** and **B = (b₁, b₂, ..., bₙ)**, then:</p>
        <p><strong>A · B = a₁b₁ + a₂b₂ + ... + aₙbₙ</strong></p>
        <p>Geometrically, the dot product also represents the projection of one vector onto another. It is calculated as:</p>
        <p><strong>A · B = |A| |B| cos(θ)</strong></p>
        <p>where |A| and |B| are the magnitudes of the vectors, and θ is the angle between them.</p>
        <p>The dot product is useful in determining whether two vectors are perpendicular. If A · B = 0, the vectors are orthogonal. It also helps in computing work done when a force is applied along a displacement.</p>
      </div>
      <p>Ready for a few questions yourself? try a few below.</p>
      <div style={{ marginBottom: '10px' }}>
      <button onClick={gotogame1}>Let's try a multiple choice game to put your new profound skills to work!</button>
</div>
<div style={{ marginBottom: '10px' }}>
<button onClick={gotogame2}>Let's walk through a Step by Step Style here!</button>
</div>
<div style={{ marginBottom: '10px' }}>
<button onClick={gotogame3}>Too Easy? Let's try some tougher questions here!</button>
</div>
      <FooterM />
    </>
  );
}

export default LinearAlgebra;
