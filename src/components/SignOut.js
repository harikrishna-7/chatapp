// src/components/SignOut.js
import React from 'react';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin');
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error during sign out:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
