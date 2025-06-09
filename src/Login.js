import React, { useState, useEffect } from 'react';
import logo from './MATH-YOO-GOO.png';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9M20hXPSd0pAikPEMfqGqILzvXm381cY",
  authDomain: "math-you-goo.firebaseapp.com",
  projectId: "math-you-goo",
  storageBucket: "math-you-goo.appspot.com",
  messagingSenderId: "708580144689",
  appId: "1:708580144689:web:7c98307995755ca1614710",
  measurementId: "G-PEDDBS89KV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Logging into Account...");
        window.location.href = `/Home?email=${email}`;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleReset = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent! Please check your inbox.");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please enter your email first to reset the password.");
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Logged in with Google!");
        window.location.href = "/Home";
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const backtoHome = () => {
    window.location.href = '/';
  };
  const gotosignup = () => {
    window.location.href = '/Signup';
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
      <h2 style={{ marginTop: '165px' }}>Welcome to Math-you-goo!</h2>
      <p>Welcome back, we're delighted you're about to spend another learning session with Math-yoo-goo!</p>
      
      <form onSubmit={handleLogin}>
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
          Login
        </button>
        <button type="button" onClick={handleGoogleLogin} className="google-button" style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}>
          Login with Google
        </button>
        <p onClick={handleReset} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Forgot Password?
        </p>
        <p onClick={gotosignup} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
          Don't have an account? Click here to Sign Up!
        </p>
        <hr/>
      </form>

      <button onClick={backtoHome} type="button" style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
}

export default Login;

