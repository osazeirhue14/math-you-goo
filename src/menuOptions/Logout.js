import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';
import { getAuth, signOut } from "firebase/auth";

function Logout() {
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out from Firebase Authentication
      localStorage.clear(); // Clear local storage if needed

      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
          zIndex: 1100
        }} 
      />

      {/* Navigation Bar */}
      <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />

      {/* Title Section */}
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <h3>Logout Page</h3>
        <p>Are you sure you want to log out?</p>
        <button 
          onClick={handleLogout} 
          style={{ padding: '10px 20px', fontSize: '18px', margin: '10px 0' }}
        >
          Confirm Logout
        </button>
        <p>You will be redirected to the login page shortly after confirming.</p>
      </div>

      {/* Footer */}
      <FooterM />
    </>
  );
}

export default Logout;


