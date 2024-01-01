// src/components/SignUp.js
import React, { useState } from 'react';
import { useFirebase } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword from firebase/auth
import '../AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
const SignUp = () => {
  const { auth } = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { firestore } = useFirebase();

  if (!auth) {
    return <div>Loading...</div>;
  }

  const handleSignUp = async () => {
    try {
      // Use createUserWithEmailAndPassword from firebase/auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      if (user) {
        await addDoc(collection(firestore, 'users'), {
          userId: user.uid,
          username: username, 
          email: user.email,
        });
      }
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
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>
          Already have an account? <Link to="/signin" class="linkToSignup">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
