import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

import './App.css';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';
import CreatePost from './components/CreatePost.js';
import Feed from './components/Feed.js'; // Import the new Feed component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="App">
      <h1>My Social App</h1>
      
      {user ? (
        // If user is logged in, show this:
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <CreatePost />
          <hr />
          <Feed /> {/* <-- Add the Feed component here */}
        </div>
      ) : (
        // If user is logged out, show this:
        <div>
          <Login />
          <hr />
          <SignUp />
        </div>
      )}
    </div>
  );
}

export default App