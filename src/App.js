// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './firebase';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut'; // Import the SignOut component
import Profile from './components/Profile';
import SubjectSelection from './components/SubjectSelection';
import AskQuestion from './components/AskQuestion';
import PreviousQuestions from './components/PreviousQuestions';
import Home from './components/Home'; // Import the Home component
// import Welcome from './components/Welcome';
import withAuth from './Hoc';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const HomeWithAuth = withAuth(Home);
  const ProfileWithAuth = withAuth(Profile);
  const AskQuestionWithAuth = withAuth(AskQuestion);
  const PreviousQuestionsWithAuth = withAuth(PreviousQuestions);
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
        <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} /> {/* Add this line */}
          <Route path="/profile" element={<ProfileWithAuth />} />
          <Route path="/subject-selection" element={<SubjectSelection />} />
          <Route path="/ask-question" element={<AskQuestionWithAuth />} />
          <Route path="/previous-questions" element={<PreviousQuestionsWithAuth />} />
          {/* Add a catch-all route for the root URL */}
          <Route path="*" element={<HomeWithAuth />} />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
