import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaChartBar } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FaChartBar /> },
    { path: '/employees', label: 'Employees', icon: <FaUsers /> },
    { path: '/attendance', label: 'Attendance', icon: <FaClipboardList /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FaUsers className="brand-icon" />
          <span>HRMS Lite</span>
        </Link>
        
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
