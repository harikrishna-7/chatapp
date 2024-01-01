// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';


const firebaseConfig = {
    apiKey: "AIzaSyDqthm-Vz8_dnq9q6QI29KnMINpxRCB7jY",
    authDomain: "chat-app-16deb.firebaseapp.com",
    projectId: "chat-app-16deb",
    storageBucket: "chat-app-16deb.appspot.com",
    messagingSenderId: "786085539613",
    appId: "1:786085539613:web:10ebeafe988a9ad5f9fbf4",
    measurementId: "G-MLM89WLLHE"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });
const FirebaseContext = createContext();
console.log('app:', app);
console.log('auth:', auth);
console.log('firestore:', firestore);
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};
export { auth,firestore};

export const useFirebase = () => {
    const { user, auth, firestore } = useContext(FirebaseContext);

  // Check if auth is defined
  if (!auth) {
    console.log('auth is not available yet.');
    return null;
  }

  // Log information for debugging
  console.log('user:', user);
  console.log('auth:', auth);
  console.log('firestore:', firestore);

  return { user, auth, firestore };
};
