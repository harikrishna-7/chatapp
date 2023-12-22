// src/components/SubjectSelection.js
import React, { useState } from 'react';
import '../SubjectSelection.css';
import { useNavigate } from 'react-router-dom';
// src/components/SubjectSelection.js

const standards = ['6th', '7th', '8th', '9th', '10th'];
const subjects = ['Mathematics', 'English']; // Add more subjects as needed

const SubjectSelection = () => {
  const navigate = useNavigate();
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const handleNext = () => {
    // Save selected standard and subject to state or context
    // Redirect to the AskQuestion page
    navigate('/ask-question');
  };

  return (
    <div>
      <h2>Select Standard and Subject</h2>
      <div>
        <label>Standard:</label>
        <select value={selectedStandard} onChange={(e) => setSelectedStandard(e.target.value)}>
          <option value="">Select Standard</option>
          {standards.map((standard) => (
            <option key={standard} value={standard}>
              {standard}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Subject:</label>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SubjectSelection;
