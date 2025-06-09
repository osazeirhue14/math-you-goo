import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../MATH-YOO-GOO.png';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import './list.css'; // Import CSS

function DifferentialCalculus() {
  const navigate = useNavigate();
  const goToGame = () => {
    window.location.href = '/CalGame';
  };
  const goToGame1 = () => {
    window.location.href = '/CalGame1';
  };
  const goToGame2 = () => {
    window.location.href = '/CalGame2';
  };
  const goToGame3 = () => {
    window.location.href = '/CalGame3';
  };
  const chain1 = () => {
    window.location.href = '/ChainGame1';
  };
  const chain2 = () => {
    window.location.href = '/ChainGame2';
  };
  const chain3 = () => {
    window.location.href = '/ChainGame3';
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

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const generateQuadraticFunction = () => {
    const n = getRandomInt(1, 10);
    const a = getRandomInt(-10, 10);
    const c = getRandomInt(-10, 10);
    return { n, a, c };
  };

  const [coefficients, setCoefficients] = useState(generateQuadraticFunction());
  const [firstDerivative, setFirstDerivative] = useState(null);
  const [secondDerivative, setSecondDerivative] = useState(null);

  const displayFunction = () => {
    const { n, a, c } = coefficients;
    return (
      
      <>
        {n}x<sup>2</sup> {a >= 0 ? '+' : '-'} {Math.abs(a)}x {c >= 0 ? '+' : '-'} {Math.abs(c)}
      </>
    );
  };

  const calculateFirstDerivative = () => {
    const { n, a } = coefficients;
    setFirstDerivative(
      <>
        {2 * n}x {a >= 0 ? '+' : '-'} {Math.abs(a)}
      </>
    );
  };

  const calculateSecondDerivative = () => {
    const { n } = coefficients;
    setSecondDerivative(<>{2 * n}</>);
  };

  const randomizeFunction = () => {
    setCoefficients(generateQuadraticFunction());
    setFirstDerivative(null);
    setSecondDerivative(null);
  };

  return (
    <>
      {/* Logo in the Top-Left Corner */}
          <img 
            src={logo} 
            alt="Math Yoo Goo Logo"
            style={{
              position: 'absolute',
              top: '110px',
              left: '40px',
              width: '120px',
              height: '120px',
              zIndex: 1100 // Ensures it's above other elements
            }} 
          />
    <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <p>Welcome to Math-you-goo's Differential Calculus section, here you can learn the many different sections of calculus, and test your skills with an array of games we have to offer, Enjoy!</p>
        <h3>Differential Calculus</h3>
        
      </div>
<div>
      <p>Throughout our range of work within differential calculus, we specialize in the following topics:</p>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
  <li>Derivatives</li>
  <li>Chain Rule</li>
  <li>Points of inflection</li>
</ul>

      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Differential Calculus</h1>
        <h2>Derivatives</h2>
        <h3>Here's a function down below:</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{displayFunction()}</p>

        <button 
          onClick={randomizeFunction} 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginRight: '10px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Randomize Function
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <button 
            onClick={calculateFirstDerivative} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              marginRight: '10px',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            First Derivative
          </button>
          <p style={{ fontSize: '20px', marginLeft: '15px', fontWeight: 'bold' }}>
            {firstDerivative || 'Result will appear here'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <button 
            onClick={calculateSecondDerivative} 
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Second Derivative
          </button>
          <p style={{ fontSize: '20px', marginLeft: '15px', fontWeight: 'bold' }}>
            {secondDerivative || 'Result will appear here'}
          </p>
        </div>
      </div>
      <h2>Now let's explain how to actually reach these first and second derivatives.</h2>
      <br></br>
      <h3>First Derivative</h3>
      <p>The first derivative is represented as <b>dy/dx</b></p>
      <p>Our example in this case is going to be y=x^2,or y=x<sup>2</sup> which can also be represented as x squared.</p>
      <p>Let's create a sceanario where we have a function y=x<sup>a</sup> and we want to get its first derivative, there's a certain rule we have to apply:</p>
      <h2>y=x<sup>a</sup></h2>
      <h3>dy/dx=a*x<sup>a-1</sup></h3>
      <b><p>Here's some steps to follow that would greatly help.</p></b>
      <ul class="centered-list">
        <li>Move the a from the power to the front of the variable and multiply it by the co-efficient</li>
        <li>Minus the power by 1, on every derivation</li>
      </ul>
      <p> So back to the previous example, a=2, a-1 = 2-1 = 1<br></br> so in the case <b>y=x<sup>2</sup></b>, we'd get answer of <b>dy/dx=2x</b> </p>
      <h3>Second Derivative</h3>
      <p>The second derivative is represented by d<sup>2</sup>y/dx<sup>2</sup>.</p>
      <p>For this second derivative, let's try a new example of y=2x<sup>2</sup>+2x+2</p>
      <p>Now to get the second derivative we need to get the first derivative first: The first derivative of this equation would be: dy/dx=4x+2</p>
      <p>We remove the "+2" at the end due to it not having a power of x.</p>
      <p>Let's now use the rules of the first derivative now to get the second one.</p>
      <p>When we derive 4x we get 4, since we take the power of 1 and minus it by 1 we get zero and x<sup>0</sup>=1, so we leave it as 4. When we derive 2 we get no value since it does'nt have a power of x.</p>
      <p>We get answer of 4.</p>
      <p>Ready to try a few questions yourself? Try a few below.</p>

<div style={{ marginBottom: '10px' }}>
  <button onClick={goToGame1}>Let's try a multiple choice game to put your new profound skills to work!</button>
</div>

      <div style={{ marginBottom: '10px' }}>
  <button onClick={goToGame3}>Let's walk through a Step by Step Style here!</button>
</div>


<div style={{ marginBottom: '10px' }}>
  <button onClick={goToGame2}>Too Easy? Let's try some tougher questions here!</button>
</div>
<div>
  <hr></hr>
  <h2>Chain Rule</h2>
  <p>The chain rule is a fundamental rule in calculus used to differentiate composite functions. If a function is composed of two functions, say f(g(x)), the derivative is found by multiplying the derivative of the outer function by the derivative of the inner function.</p>
  
  <h3>Formula:</h3>
  <p>If y = f(g(x)), then the derivative is:</p>
  <h3>dy/dx = f'(g(x)) * g'(x)</h3>

  <h3>Example:</h3>
  <p>Let y = (3x² + 2x + 1)⁵</p>
  <p>Outer function: f(u) = u⁵</p>
  <p>Inner function: g(x) = 3x² + 2x + 1</p>
  <p>Derivative of outer: f'(u) = 5u⁴</p>
  <p>Derivative of inner: g'(x) = 6x + 2</p>
  <p>Applying chain rule: dy/dx = 5(3x² + 2x + 1)⁴ * (6x + 2)</p>

  <h3>Understanding the Chain Rule</h3>
  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>

    <li>Identify the inner and outer function.</li>
    <li>Differentiate the outer function while keeping the inner function unchanged.</li>
    <li>Multiply by the derivative of the inner function.</li>
  </ul>

  <div style={{ marginBottom: '10px' }}>
  <button onClick={chain1} >Let's try a multiple choice game to put your new profound skills to work!</button>
</div>
<div style={{ marginBottom: '10px' }}>
  <button onClick={chain2} >Let's walk through a Step by Step Style here!</button>
</div>
<div style={{ marginBottom: '10px' }}>
  <button onClick={chain3} >Too Easy? Let's try some tougher questions here!</button>
</div>
</div>


    </div>
    <FooterM/>
    </>
  );
}

export default DifferentialCalculus;



