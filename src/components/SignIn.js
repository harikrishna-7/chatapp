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
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/Home');
            console.log('User signed in successfully!');

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign In</h2>
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
