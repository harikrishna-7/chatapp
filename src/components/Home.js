// src/components/Home.js
// import React from 'react';
// import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import './Navbar.css'; // Import the CSS file
// src/components/Home.js
import Navbar from './Navbar';

const Home = () => {
  const standards = ['6th', '7th', '8th', '9th', '10th'];
  const subjects = ['Mathematics', 'Science', 'English'];

  return (
    <div>
    <Navbar />
    <div className="container">
      <div className="content">
        <h2>Welcome to the Question Portal</h2>
        
        <div>
        <label className="label">Select Standard:</label>
        <select className="form-select select-standard">
            {standards.map((standard, index) => (
              <option key={index}>{standard}</option>
            ))}
          </select>
        </div>

        <div>
        <label className="label">Select Subject:</label>
        <select className="form-select select-subject">
            {subjects.map((subject, index) => (
              <option key={index}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Enter Your Question:</label>
          <textarea className="form-control question-input" rows="4" cols="50" placeholder="Type your question here..."></textarea>
        </div>

        <button type="button" className="btn btn-primary submit-btn">Submit</button>
      </div>
    </div>
  </div>
  );
};

export default Home;
