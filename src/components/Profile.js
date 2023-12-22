// src/components/Profile.js
import React, { useState } from 'react';
import { useFirebase } from '../firebase';
import Navbar from './Navbar';

import './Navbar.css'; 
import '../Profile.css';

const Profile = () => {
  const { user, auth } = useFirebase();
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleUpdateProfile = async () => {
    try {
      await auth.currentUser.updateProfile({
        displayName: displayName,
      });
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div>
          <Navbar />
    <div className="container profile-container">
      <h2 className="profile-header">Profile</h2>
      <form className="profile-form">
        <div className="mb-3">
          <label htmlFor="displayName" className="form-label">Display Name</label>
          <input
            type="text"
            className="form-control"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary btn-update-profile"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default Profile;

