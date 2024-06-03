import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../../src/styles/Header.css';

function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="custom-header">
      <nav className="custom-nav">
        <h2 className="custom-logo">EXAM-PORTAL</h2>
        <ul className="custom-nav-links">
          {isLoggedIn ? (
            <>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Sign In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
