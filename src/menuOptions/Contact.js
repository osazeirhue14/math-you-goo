import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import FooterM from './FooterM';
import logo from '../MATH-YOO-GOO.png';

function Contact() {
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
          zIndex: 1100 // Ensures it's above other elements
        }} 
      />

      {/* Navigation Bar */}
      <Navbar options={['Home', 'Account', 'Differential Calculus', 'Linear Algebra', 'Contact', 'Review', 'Help', 'Logout']} />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '100px' }}>
        <h1>Math-You-Goo!</h1>
        <p>Welcome to Math-you-goo's contact page. Any contact information you need is included in this page.</p>
        <h3>Contact Page</h3>
        <p>
          The Computer Science Administrative, Technical, and Academic Offices are located on the Ground and 1st floor of the Eolas Building, North Campus, Maynooth University.<br /><br />
          If you wish to make an appointment to see a lecturer, you should first email them to confirm available times. You will find the lecturers' email addresses here.<br /><br />
          <strong>Department Contact Details:</strong><br /><br />
          Department of Computer Science<br />
          Eolas Building<br />
          North Campus<br />
          Maynooth University<br />
          Maynooth<br />
          Co Kildare<br /><br />
          Tel: (01) 708 3847<br />
          Email: computerscience.department@mu.ie<br /><br />
          Follow us on Twitter: @MU_CompSci
        </p>
      </div>

      <FooterM />
    </>
  );
}

export default Contact;