import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from './MATH-YOO-GOO.png';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyB9M20hXPSd0pAikPEMfqGqILzvXm381cY",
  authDomain: "math-you-goo.firebaseapp.com",
  projectId: "math-you-goo",
  storageBucket: "math-you-goo.appspot.com",
  messagingSenderId: "708580144689",
  appId: "1:708580144689:web:7c98307995755ca1614710",
  measurementId: "G-PEDDBS89KV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = (event) => {
    event.preventDefault();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        alert("Creating Account...");
        // Redirect or do something else
        window.location.href = `/Home?email=${email}`;
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const backtoHome = () => {
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <img 
        src={logo} 
        alt="Math Yoo Goo Logo" 
        style={{
          width: '200px',
          height: 'auto',
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
        }} 
      />
      <h1 style={{ marginTop: '165px' }}>Sign Up Form</h1>
      <p>Welcome to Math-you-goo, signup below to get access to our many Algebraic help pages!</p>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ marginTop: '0.5rem', cursor: 'pointer' }}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Sign Up
        </button>
        <p><b>By clicking Sign up, I agree to Math-you-goo's Terms and Privacy Policy</b></p>
        <hr/>
      </form>
      <p>Already Registered? <Link to="/login">Login</Link></p> {/* Link to login page */}
      <button type="button" onClick={backtoHome} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
}

export default Signup;
