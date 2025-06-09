// DropdownMenu.js
import React, { useState } from 'react';
import './DropdownMenu.css';

function DropdownMenu({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option); // Call the onSelect function passed from Home.js
    setIsOpen(false);  // Close the dropdown after selecting an option
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menu
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;


