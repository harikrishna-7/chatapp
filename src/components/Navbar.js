// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate,useLocation  } from 'react-router-dom';
import { useFirebase } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase();
  const location = useLocation();

  const handleSignOut = async () => {
    // Sign out the user and redirect to the sign-in page
    try {
      await auth.signOut();
      localStorage.user ='';
      navigate('/signin');
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <div className="left-nav">
    <nav>
      <ul>
        <li className={location.pathname === '/home' ? 'active' : ''}>
            <Link to="/home">Home</Link>
          </li>
          <li className={location.pathname === '/profile' ? 'active' : ''}>
            <Link to="/profile">Profile</Link>
          </li>
          <li id ="prevque" className={location.pathname === '/previous-questions' ? 'active' : ''}>
            <Link to="/previous-questions">Previous Questions</Link>
          </li>
        <li>
          <Link onClick={handleSignOut}>Log Out</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
