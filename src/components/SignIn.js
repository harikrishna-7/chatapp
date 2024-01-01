// src/components/SignIn.js
import React, { useState } from 'react';
import { useFirebase } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { auth } = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Check if auth is defined before using it
    if (!auth) {
        return <div>Loading...</div>;
    }

    const handleSignIn = async () => {
        try {
            const response =await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', response.user.uid)
            // console.log(localStorage)
            navigate('/Home');
            console.log('User signed in successfully!');

        } catch (error) {
            if(error.message === "Firebase: Error (auth/invalid-login-credentials).")
                alert("invalid-login-credentials");
            else if(error.message === "Firebase: Error (auth/invalid-email).")
                alert("invalid-email");

        }
    };

    return (
        <div className="auth-form">
            <h2>Student Sign In</h2>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignIn}>Sign In</button>
            <p>
                Don't have an account? <Link to="/signup" class="linkToSignup">Sign Up</Link>
            </p>
        </div>
    );
};

export default SignIn;
