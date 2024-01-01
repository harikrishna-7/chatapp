// src/hoc.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useFirebase } from './firebase';

// Higher-Order Component (HOC)
const withAuth = (Component) => (props) => {
  const user = localStorage.user;
  // If the user is authenticated, render the component, otherwise navigate to sign-in
  return user ? <Component {...props} /> : <Navigate to="/signin" />;
};

export default withAuth;
