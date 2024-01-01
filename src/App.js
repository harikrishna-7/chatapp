// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './firebase';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut'; // Import the SignOut component
import Profile from './components/Profile';
import PreviousQuestions from './components/PreviousQuestions';
import Home from './components/Home'; // Import the Home component
// import Welcome from './components/Welcome';
import withAuth from './Hoc';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const HomeWithAuth = withAuth(Home);
  const ProfileWithAuth = withAuth(Profile);
  const PreviousQuestionsWithAuth = withAuth(PreviousQuestions);
  return (
    <FirebaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
          <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/profile" element={<ProfileWithAuth />} />
            <Route path="/previous-questions" element={<PreviousQuestionsWithAuth />} />
            <Route path="*" element={<HomeWithAuth />} />
          </Routes>
        </Router>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
