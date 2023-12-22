// src/components/AskQuestion.js
// import React, { useState } from 'react';
import '../AskQuestion.css';

// src/components/AskQuestion.js
// import { useNavigate } from 'react-router-dom';
// src/components/AskQuestion.js
import React, { useState } from 'react';
import { useFirebase } from '../firebase'; // Adjust the import path based on your project structure
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const navigate = useNavigate();

  const { auth, firestore } = useFirebase();
  const [question, setQuestion] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');

  const storage = getStorage();

  const handleAskQuestion = async () => {
    try {
      // Check if all required fields are filled
      if (!question || !standard || !subject) {
        console.error('Please fill in all fields.');
        return;
      }

      // Upload the PDF file to Firebase Storage
      const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
      await uploadBytes(storageRef, pdfFile);

      // Get the download URL of the uploaded PDF
      const pdfUrl = await getDownloadURL(storageRef);

      // Add the question and associated data to the Firestore collection
      const questionDocRef = await addDoc(collection(firestore, 'questions'), {
        userId: auth.currentUser.uid,
        question,
        pdfUrl,
        standard,
        subject,
        timestamp: new Date(),
      });

      // Now, you can use the question data to call the external API
      const apiUrl = 'https://www.chatpdf.com/docs/api/backend'; // Replace with the actual API URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questionId: questionDocRef.id,
          // Include any other relevant data needed by the API
        }),
      });

      // Handle the API response as needed
      const responseData = await response.json();
      console.log('API Response:', responseData);

      // Clear form fields after successful submission
      setQuestion('');
      setPdfFile(null);
      setStandard('');
      setSubject('');
      navigate('/previousquestions');

      console.log('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error.message);
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <label>Question:</label>
      <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
      <label>Upload PDF:</label>
      <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
      <label>Standard:</label>
      <input type="text" value={standard} onChange={(e) => setStandard(e.target.value)} />
      <label>Subject:</label>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <button onClick={handleAskQuestion}>Submit Question</button>
    </div>
  );
};

export default AskQuestion;
