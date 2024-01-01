// src/components/Home.js
import React, { useState } from 'react';
import Axios from 'axios';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useFirebase } from '../firebase';
import Navbar from './Navbar';
import './Home.css'; // Import the CSS file
import './Navbar.css'; 
// Import your loader GIF
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

  const subjectSourceIdMap = {
    Mathematics: "src_uBiADHvfj3PXE8EpZHPdO",
    Science: "src_IImeo6tTzTBPJLsF3c67B",
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    const selectedSourceId = subjectSourceIdMap[subject];
    setSubject(subject)
    setSelectedSourceId(selectedSourceId);
  };

  const handleSubmit = async () => {
    try {
      if (!standard || standard === '--Select--') {
        alert('Please select a standard.');
        return;
      }

      if (!subject || subject === '--Select--') {
        alert('Please select a subject.');
        return;
      }

      if (!question.trim()) {
        alert('Please enter your question.');
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

      alert('Question submitted successfully!');
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
            <label className="label">Select Standard:</label>
            <select className="form-select select-standard" onChange={(e) => setStandard(e.target.value)}>
              {standards.map((std, index) => (
                <option key={index}>{std}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Select Subject:</label>
            <select className="form-select select-subject" onChange={handleSubjectChange}>
              {subjects.map((subj, index) => (
                <option key={index}>{subj}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Enter Your Question:</label>
            <textarea
              className="form-control question-input"
              rows="4"
              cols="50"
              placeholder="Type your question here..."
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
          </div>

          <button type="button" className="submit" onClick={handleSubmit}>
            {loading ? <img src={loaderGIF} width="50px" height="20px"   alt="loading" /> : 'Submit'}
          </button>

          {apiResponse && (
            <div className="api-response">
              <h4>Answer:</h4>
              <span>{JSON.stringify(apiResponse.data.content.replace(/\n/g, '\n'), null, 2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
