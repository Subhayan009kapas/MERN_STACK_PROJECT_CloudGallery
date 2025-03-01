import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navber.css';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
   
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <h2>Image Gallery</h2>
      <div className="navbar-user" onClick={toggleDropdown}>
        {username}
      </div>
     
      {showDropdown && (
        <div className="dropdown" ref={dropdownRef}>
          <h3>{username}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
