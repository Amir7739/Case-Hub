import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="https://f2fintech.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://i0.wp.com/f2fintech.com/wp-content/uploads/2022/09/cropped-F2-Fintech-logo-1-removebg-preview.png?w=500&ssl=1" alt="F2 Fintech Logo" />
        </a>
      </div>
      <div className="navbar__buttons">
        <Link to="/" className="navbar__link">
          <button className="navbar__button">Case Issue Form</button>
        </Link>
        <div className="navbar__loginContainer" ref={dropdownRef}>
          <button className="navbar__button" onClick={toggleLoginDropdown}>Login</button>
          {showLoginDropdown && (
            <div className="navbar__dropdown">
              <Link to="/userstatus" className="navbar__link">
                <button className="navbar__dropdownButton">User</button>
              </Link>
              <Link to="/api/adminrecord" className="navbar__link">
                <button className="navbar__dropdownButton">Admin</button>
              </Link>
              <Link to="/api/formData" className="navbar__link">
                <button className="navbar__dropdownButton">IT</button>
              </Link>
              <Link to="/api/hrrecord" className="navbar__link">
                <button className="navbar__dropdownButton">HR</button>
              </Link>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
