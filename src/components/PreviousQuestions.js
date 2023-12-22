// src/components/PreviousQuestions.js
import '../PreviousQuestions.css';
// src/components/ViewQuestions.js
import React, { useEffect, useState } from 'react';
import { useFirebase } from '../firebase';
import Navbar from './Navbar';

import './Navbar.css'; 
import './Home.css'; // Import the CSS file

const PreviousQuestions = () => {
  const { firestore } = useFirebase();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Add code to fetch questions from Firestore
        const querySnapshot = await firestore.collection('questions').get();
        const questionData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setQuestions(questionData);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions();
  }, [firestore]);

  return (
    <div>
      <Navbar />

    <div className="custom-container mt-4">
      
      <h2>View Questions</h2>
      <div className="row">
          <div className="col-md-6">
            <ul>
              {questions.map((question) => (
                <li key={question.id}>{question.text}</li>
              ))}
            </ul>
          </div>
        </div>
     
    </div>
    </div>
  );
};


export default PreviousQuestions;
