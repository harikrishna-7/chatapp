// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useFirebase();

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
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/previous-questions">Previous Questions</Link>
        </li>
        <li>
          <Link onClick={handleSignOut}>Sign Out</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
