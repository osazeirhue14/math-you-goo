import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './App.css';
import logo from './MATH-YOO-GOO.png';
import logo1 from './design1.png';
import logo2 from './design2.png';
import logo3 from './design3.png';

function App() {
  const navigate = useNavigate(); 

  return (
    <div className="app-container">
      {/* Logo at the Top-Left Corner */}
      <img 
        src={logo} 
        alt="Math Yoo Goo Logo" 
        className="logo"
      />

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Math-Yoo-Goo!</h1>
        <p className="intro-text">
          Math-You-Goo is an interactive algebra game designed to help college students 
          build a strong understanding of essential mathematical topics such as Linear Algebra 
          and Differential Calculus.
        </p>
        <div className="button-group">
          <button className="cta-button" onClick={() => navigate('/Signup')}>Sign Up</button>
          <button className="cta-button" onClick={() => navigate('/Login')}>Login</button>
        </div>
      </div>

      {/* Image Design Section */}
      <div className="image-container">
        <img src={logo1} alt="Design 1" className="design-image"/>
        <img src={logo2} alt="Design 2" className="design-image"/>
        <img src={logo3} alt="Design 3" className="design-image"/>
      </div>

      {/* Informational Section */}
      <div className="info-section">
        <h2>Master Linear Algebra with Math-Yoo-Goo!</h2>
        <p>
          Are matrix transformations, vector spaces, and eigenvalues getting you down? 
          We get it—linear algebra can be tough. But you don’t have to face it alone!  
          Math-Yoo-Goo is your interactive, easy-to-use learning tool designed to help 
          college students strengthen their algebra skills, especially in complex areas 
          like linear algebra.
        </p>
        <p>
          With step-by-step guidance, practice problems, and personalized feedback, 
          you’ll gain confidence in every lesson. Ready to take your math game to the next level? 
          Sign up now and let’s conquer linear algebra together!
        </p>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <label>Have any feedback for us? Let us know below:</label>
        <input type="text" className="feedback-input" placeholder="Enter your feedback here..." />
        <button className="cta-button" onClick={() => window.location.reload()}>Submit</button>
      </div>

      {/* Footer Section */}
      <p className="credits">Final Year Project by Osaze Irhue, supervised by Barak Pearlmutter.</p>
      <Footer />
    </div>
  );
}

export default App;



