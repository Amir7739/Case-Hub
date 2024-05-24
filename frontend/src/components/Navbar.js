import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRoomBookingDropdown, setShowRoomBookingDropdown] = useState(false);
  const loginDropdownRef = useRef(null);
  const roomBookingDropdownRef = useRef(null);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
    if (showRoomBookingDropdown) {
      setShowRoomBookingDropdown(false);
    }
  };

  const toggleRoomBookingDropdown = () => {
    setShowRoomBookingDropdown(!showRoomBookingDropdown);
    if (showLoginDropdown) {
      setShowLoginDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(event.target)
      ) {
        setShowLoginDropdown(false);
      }
      if (
        roomBookingDropdownRef.current &&
        !roomBookingDropdownRef.current.contains(event.target)
      ) {
        setShowRoomBookingDropdown(false);
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
          <button className="navbar__button">Query Hub</button>
        </Link>
        <Link to="/signup" className="navbar__link">
          <button className="navbar__button">Sign up</button>
        </Link>
        
        <div className="navbar__loginContainer" ref={loginDropdownRef}>
          <button className="navbar__button" onClick={toggleLoginDropdown}>Query Hub Login</button>
          {showLoginDropdown && (
            <div className="navbar__dropdown">
              <Link to="/api/userstatus" className="navbar__link">
                <button className="navbar__dropdownButton">User</button>
              </Link>
              <Link to="/login" className="navbar__link">
                <button className="navbar__dropdownButton">Other</button>
              </Link>
            </div>
          )}
        </div>

        <div className="navbar__loginContainer" ref={roomBookingDropdownRef}>
          <button className="navbar__button" onClick={toggleRoomBookingDropdown}>Room Booking</button>
          {showRoomBookingDropdown && (
            <div className="navbar__dropdown">
              <Link to="/home" className="navbar__link">
                <button className="navbar__dropdownButton">Book Room</button>
              </Link>
              <Link to="/data" className="navbar__link">
                <button className="navbar__dropdownButton">Check Room Status</button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
