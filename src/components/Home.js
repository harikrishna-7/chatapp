// src/components/Home.js
import React, { useState } from 'react';
import Axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../firebase';
import Navbar from './Navbar';
import './Home.css'; 
import './Navbar.css'; 
import loaderGIF from '../loading-loader.gif';

const Home = () => {
  const standards = ['--Select--', '6th', '7th', '8th', '9th', '10th'];
  const subjects = ['--Select--', 'Mathematics', 'Science', 'English'];
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, firestore } = useFirebase();
  const [standardError, setStandardError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const subjectSourceIdMap = {
    Mathematics: "src_uBiADHvfj3PXE8EpZHPdO",
    Science: "src_IImeo6tTzTBPJLsF3c67B",
    English:"src_ml9YH3WBiLmKyIkcFmc1d"
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    const selectedSourceId = subjectSourceIdMap[subject];
    setSubject(subject)
    setSelectedSourceId(selectedSourceId);
  };

  const handleSubmit = async () => {
    try {
      setStandardError(false);
      setSubjectError(false);
      setQuestionError(false);

      // Validation
      if (!standard || standard === '--Select--') {
        setStandardError(true);
        return;
      }

      if (!subject || subject === '--Select--') {
        setSubjectError(true);
        return;
      }

      if (!question.trim()) {
        setQuestionError(true);
        return;
      }
      if (!selectedSourceId) {
        console.error('Selected sourceId is null or undefined');
        return;
      }

      setLoading(true);

      const requestData = {
        sourceId: selectedSourceId,
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      };

      const headers = {
        'x-api-key': 'sec_4XiQli31G5izcWHcjFivNyWzqJnSaYlH',
      };

      const response = await Axios.post(
        'https://api.chatpdf.com/v1/chats/message',
        requestData,
        { headers }
      );

      setApiResponse(response);

      if (response.status === 200) {
        if (!user || !firestore) {
          console.error("User or firestore is not available.");
          return;
        }

        const questionsCollection = collection(firestore, 'questions');
        const questionData = {
          answer: response.data.content,
          pdfUrl: selectedSourceId,
          question,
          standard,
          subject,
          timestamp: serverTimestamp(),
          userId: user.uid,
        };

        const docRef = await addDoc(questionsCollection, questionData);
        console.log('Question added with ID:', docRef.id);
      }
    } catch (error) {
      console.log('API Response Error:', error.response);
      console.error('Error submitting question:', error);
      alert('Error submitting question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="content">
          <h2>Welcome to the Question Portal!</h2>

          <div>
          <label className={`label ${standardError ? 'error' : ''}`}>Select Standard:</label>
          <select
            id="selstandard" className={`form-select select-standard ${standardError ? 'error-border' : ''}`}
            onChange={(e) => {
              setStandard(e.target.value);
              setStandardError(false); // Reset error when the user makes a selection
            }}
          >
              {standards.map((std, index) => (
                <option key={index}>{std}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`label ${subjectError ? 'error' : ''}`}>Select Subject:</label>
            <select
              id="selsubj" className={`form-select select-subject ${subjectError ? 'error-border' : ''}`}
              onChange={(e) => {
                handleSubjectChange(e);
                setSubjectError(false); // Reset error when the user makes a selection
              }} >       
              {subjects.map((subj, index) => (
                <option key={index}>{subj}</option>
              ))}
            </select>
          </div>

          <div>
             <label className={`label ${questionError ? 'error' : ''}`}>Enter Your Question:</label>
              <textarea
                className={`form-control question-input ${questionError ? 'error-border' : ''}`}
                rows="4"
                cols="50"
                placeholder="Type your question here..."
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setQuestionError(false); // Reset error when the user enters text
                }}
            ></textarea>
          </div>

          <button type="button" className="btn btn-primary submit" onClick={handleSubmit}>
            {loading ? <img src={loaderGIF} width="50px" height="20px"   alt="loading" /> : 'Submit'}
          </button>

          {apiResponse && (
            <div className="api-response">
              <h4>Answer:</h4>
              <span>{JSON.stringify(apiResponse.data.content.replace(/[^a-zA-Z ]/g, ""), null, 2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
