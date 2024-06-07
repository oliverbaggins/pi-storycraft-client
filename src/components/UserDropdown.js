import React, { useState, useEffect, useRef } from 'react';
import './UserDropdown.css';
import Exit from "../Assets/exit.svg";

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Implemente sua lógica de logout aqui
    console.log('Logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirecione para a página de login
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <div className="user-profile" onClick={handleDropdownToggle}>
        {/* <img src={user.profileImage} alt="User profile" /> */}
        <span className='userText'>{user.username}</span>
      </div>
      {isOpen && (
        <div onClick={handleLogout} className="dropdown-content">
          <img className='ExitImg' src={Exit} alt='Exit'/>
          <button>Sair</button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
