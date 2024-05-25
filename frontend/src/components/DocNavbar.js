import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const DocNavbar = () => {
 
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <a href="https://f2fintech.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://i0.wp.com/f2fintech.com/wp-content/uploads/2022/09/cropped-F2-Fintech-logo-1-removebg-preview.png?w=500&ssl=1" alt="F2 Fintech Logo" />
        </a>
      </div>
      <div className="navbar__buttons">
        <Link to="https://f2fintech.com/" className="navbar__link">
          <button className="navbar__button">Explore F2-Fintech</button>
        </Link>
      </div>
    </nav>
  );
};

export default DocNavbar;
