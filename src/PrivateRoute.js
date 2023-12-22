// PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext'; // Import the useAuth hook
// src/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useFirebase } from './firebase';

const PrivateRoute = ({ element, ...props }) => {
  const { user } = useFirebase();

  return user ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
