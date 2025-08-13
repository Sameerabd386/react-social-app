import React, { useState } from 'react';
import { auth } from '../firebase'; // Import auth from your firebase.js file
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the sign-up button click
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log("Signed up successfully:", user);
        alert("Account created successfully!");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error signing up:", error.message);
        alert("Error: " + error.message);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;