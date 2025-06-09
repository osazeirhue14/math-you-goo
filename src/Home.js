import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import lecture from './lecture.jpg';
import Footer from './Footer';
import logo from './MATH-YOO-GOO.png';

function Home() {
  const navigate = useNavigate();

  const handleSelect = (option) => {
    switch (option) {
      case 'Home': navigate('/Home'); break;
      case 'Differential Calculus': navigate('/DifferentialCalculus'); break;
      case 'Help': navigate('/Help'); break;
      case 'Account': navigate('/Account'); break;
      case 'Linear Algebra': navigate('/LinearAlgebra'); break;
      case 'Contact': navigate('/Contact'); break;
      case 'Logout': navigate('/Logout'); break;
      case 'Review': navigate('/Review'); break;
      default: break;
    }
  };

  return (
    <>
      {/* Logo in the Navbar */}
      <div style={{ position: 'absolute', top: '110px', left: '40px', zIndex: 1100 }}>
        <img 
          src={logo} 
          alt="Math Yoo Goo Logo"
          style={{ width: '120px', height: '120px' }}
        />
      </div>

      {/* Navigation Bar */}
      <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />

      {/* Title (Centered) */}
      <div style={{ textAlign: 'center', marginTop: '120px' }}>  
        <h1>Math-you-goo!</h1>
      </div>

      {/* First Paragraph */}
      <p style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center', lineHeight: '1.6' }}>
        <strong>Math-you-goo</strong> is a comprehensive <strong>educational app</strong> designed to support students and enthusiasts 
        in mastering complex topics in differential calculus and linear algebra. It provides clear, 
        step-by-step problem-solving guides that tackle essential calculus concepts like derivatives, 
        limits, and integrals, as well as linear algebra fundamentals like vector spaces, matrices, 
        and linear transformations.
      </p>

      {/* Background Image with Overlay */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: 'auto',
          padding: '30px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '20px'
        }}
      >
        <div 
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lecture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        ></div>

        {/* Second Paragraph */}
        <p style={{ position: 'relative', padding: '20px', lineHeight: '1.6' }}>
          For each topic, Math-you-goo offers a range of <strong>sample questions</strong> with complete answers and 
          thorough explanations. In <strong>differential calculus</strong>, users can explore problems on derivatives, 
          limits, and trigonometric functions, with detailed solutions clarifying each step. Similarly, 
          in <strong>linear algebra</strong>, the app includes problems on matrix operations, vector analysis, and 
          eigenvalues, ensuring users understand fundamental principles.
        </p>
      </div>

      {/* Third Paragraph */}
      <p style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center', lineHeight: '1.6' }}>
        Whether you're a student struggling with advanced math topics or an enthusiast wanting 
        to refine your skills, <strong>Math-you-goo</strong> is the perfect tool to enhance your understanding 
        and problem-solving abilities.
      </p>

      {/* Two Boxes Side by Side */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        
        {/* Differential Calculus Box */}
        <div style={{
          width: '300px', 
          padding: '20px', 
          border: '2px solid black', 
          borderRadius: '10px', 
          textAlign: 'left',
          backgroundColor: '#f4f4f4',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h3>Differential Calculus</h3>
          <ul>
            <li>Limits and Continuity</li>
            <li>Derivatives</li>
            <li>Chain Rule</li>
            <li>Applications of Derivatives</li>
          </ul>
          <a href="/DifferentialCalculus" style={{ display: 'block', textAlign: 'center', padding: '10px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Learn More
          </a>
        </div>

        {/* Linear Algebra Box */}
        <div style={{
          width: '300px', 
          padding: '20px', 
          border: '2px solid black', 
          borderRadius: '10px', 
          textAlign: 'left',
          backgroundColor: '#f4f4f4',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <h3>Linear Algebra</h3>
          <ul>
            <li>Vectors and Spaces</li>
            <li>Matrices and Determinants</li>
            <li>Eigenvalues and Eigenvectors</li>
            <li>Linear Transformations</li>
          </ul>
          <a href="/LinearAlgebra" style={{ display: 'block', textAlign: 'center', padding: '10px', marginTop: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Learn More
          </a>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;


