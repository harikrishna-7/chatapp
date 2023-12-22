// src/components/SignUp.js
import React, { useState } from 'react';
import { useFirebase } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from firebase/auth
import '../AuthForm.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!auth) {
    return <div>Loading...</div>;
  }

  const handleSignUp = async () => {
    try {
      // Use createUserWithEmailAndPassword from firebase/auth
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/welcome');
      console.log('User registered successfully!');

    } catch (error) {
      if(error.message === 'Firebase: Error (auth/email-already-in-use).')
      {
        alert("User alrerady exist, please try again.")
      }
      else
        alert(error.message);
    }
  };

  return (
    <div  className="auth-form">
      <h2>Sign Up</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
