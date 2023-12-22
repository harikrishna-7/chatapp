// Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../firebase';
import '../Welcome.css';

const Welcome = () => {
  const { auth } = useFirebase();
  const user = auth.currentUser;

  return (
    <div className="container">
      <h2>Welcome, {user ? user.email : 'Guest'}!</h2>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile Update</Link>
            </li>
            <li>
              <Link to="/previous-questions">Previously Asked Questions</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Welcome;
