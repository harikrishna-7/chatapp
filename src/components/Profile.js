import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { firestore } from '../firebase';

import { updateProfile, reauthenticateWithCredential, EmailAuthProvider } from '@firebase/auth';
import './Navbar.css';
import '../Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [docId, setDocId] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch user data from Firestore on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(firestore, "users"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        if (userDocs.length > 0) {
          setNewName(userDocs[0].data.username);
          setDocId(userDocs[0].id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  const handleNameUpdate = async () => {
    try {
      setError(null);

      // Ensure the user has entered their current password
      if (!currentPassword) {
        setError('Please enter your current password.');
        return;
      }

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);

      // Update the display name in Firebase Authentication
      await updateProfile(currentUser, { displayName: newName });

      // Update the username in Firestore
      const userRef = doc(firestore, 'users', docId);
      await updateDoc(userRef, { username: newName });

      setSuccess(true);
    } catch (error) {
      setError('');
      if (error.message === "Firebase: Error (auth/invalid-login-credentials).") {
        setError("Invalid Password, Please try again.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2 className="profile-header"><b>Profile</b></h2>
        <form className="prof-content">
          <p><b>Email</b>: {currentUser ? currentUser.email : 'Loading...'}</p>

          <div className="mb-3">
            <label htmlFor="username" className="form-label"><b>Username</b>:</label>
            <input type="text" className="form-control" id="username" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label"><b>Current Password</b>:</label>
            <input type="password" className="form-control" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </div>

          <button type="button" id="profsub" className="btn btn-primary" onClick={handleNameUpdate}>Update Username</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>Profile updated successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
