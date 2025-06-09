import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';
import defaultProfile from './default-profile.png';
import { getAuth, onAuthStateChanged, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

function Account() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const changePassword = async () => {
    if (!user) {
      console.error("No user is signed in.");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.error("New passwords do not match.");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <p>Welcome to Math-you-goo's Account section, here you can access sensitive account info., while changing profile pics, changing passwords etc.</p>
        <h3>Account</h3>
        <div id="userprofile" style={{ maxWidth: '600px', margin: '40px auto', padding: '35px', border: '2px solid black', borderRadius: '20px', backgroundColor: '#f4f4f4' }}>
          {user ? (
            <>
              <p className="strong">Name: <span id="username">{user.displayName || "N/A"}</span></p>
              <p>Email: <span id="userEmail">{user.email}</span></p>
              <img 
                src={user.photoURL || defaultProfile} 
                alt="Profile Picture" 
                id="userProfilePicture" 
                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
              />
              <h3>Change Password</h3>
              <input 
                type={showPasswords ? "text" : "password"} 
                placeholder="Current Password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', margin: '5px' }}
              /><br />
              <input 
                type={showPasswords ? "text" : "password"} 
                placeholder="New Password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', margin: '5px' }}
              /><br />
              <input 
                type={showPasswords ? "text" : "password"} 
                placeholder="Confirm New Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: 'calc(100% - 10px)', padding: '8px', fontSize: '16px', margin: '5px' }}
              /><br />
              <button 
                onClick={() => setShowPasswords(!showPasswords)} 
                style={{ 
                  margin: '10px', 
                  padding: '10px', 
                  fontSize: '16px', 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer' 
                }}
              >
                {showPasswords ? "Hide Passwords" : "Show Passwords"}
              </button><br />
              <button 
                onClick={changePassword} 
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  fontSize: '18px', 
                  backgroundColor: '#007BFF', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  margin: '10px' 
                }}
              >
                Update Password
              </button>
            </>
          ) : (
            <p>Please log in to view account details.</p>
          )}
        </div>
      </div>

      <FooterM />
    </>
  );
}

export default Account;

