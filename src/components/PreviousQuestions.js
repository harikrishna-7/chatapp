import React, { useEffect, useState } from 'react';
import { useFirebase } from '../firebase';
import '../PreviousQuestions.css';
import Navbar from './Navbar';
import { useAuth } from '../contexts/AuthContext';
import { collection, where, query, getDocs } from "firebase/firestore";
import './Navbar.css';
import './Home.css';

const PreviousQuestions = () => {
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : null;
  const { firestore } = useFirebase();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (userId) {
          const q = query(collection(firestore, "questions"), where("userId", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);
          const questionsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setQuestions(questionsData);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [firestore, currentUser, userId]);

  return (
    <div>
      <Navbar />
      <div className="question-content">
        <h2>Previously Asked Questions</h2>
        <p></p>
        {questions.length === 0 ? (
          <p>No questions found.</p>
        ) : (
          <ul className="qdata">
            {questions.map((question) => (
              <li key={question.id}>
                <p><b>Question</b>: {question.question}</p>
                <p><b>Answer</b>: {question.answer}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PreviousQuestions;
