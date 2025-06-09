import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Add CSS for styling

function Navbar({ options }) {
  const navigate = useNavigate();

  const handleSelect = (option) => {
    navigate(`/${option.replace(/\s+/g, '')}`); // Navigate to the selected page
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        {options.map((option, index) => (
          <li key={index} className="nav-item" onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
