import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';

function Help() {
  const navigate = useNavigate();

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
        <p>Welcome to Math-you-goo's Help section, here you can gain answers to some of our most FAQ's</p>
        <h3>Help Section</h3>

        {/* FAQ Section */}
        <div style={{ maxWidth: '800px', textAlign: 'left', marginTop: '20px' }}>
          <h4>Frequently Asked Questions</h4>
          <ul>
            <li><strong>What age group are these games designed for?</strong><br />These games are suitable for ages 15 and up.</li>
            <li><strong>What topics are covered in the game?</strong><br />The game covers Differential Calculus and Linear Algebra concepts.</li>
            <li><strong>Can I reset my progress?</strong><br />Yes, you can reset your progress from the account settings page.</li>
            <li><strong>Do I need an account to play?</strong><br />Yes, an account is required to track your progress and save your achievements.</li>
            <li><strong>Is Math-you-goo free to use?</strong><br />Yes! Math-you-goo is completely free to play and learn from.</li>
            <li><strong>Can I play on mobile devices?</strong><br />Yes, Math-you-goo is optimized for only desktop devices, we plan to soon add mobile devices aswell.</li>
            <li><strong>Are there any in-app purchases?</strong><br />No, all content is freely available without any in-app purchases.</li>
            <li><strong>How can I report a bug or issue?</strong><br />You can report issues through the contact page or by emailing our support team.</li>
            <li><strong>Does the game support multiple languages?</strong><br />Currently, the game is available in English, with plans to add more languages soon.</li>
            <li><strong>How often is new content added?</strong><br />We regularly update the game with new exercises and features based on user feedback.</li>
          </ul>
        </div>
      </div>

      <FooterM />
    </>
  );
}

export default Help;

