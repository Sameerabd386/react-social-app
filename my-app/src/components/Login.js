import { useState } from 'react';
import React from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";


function Login() {

    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("logged in Successfully", user);
            alert("login successful");
        })
        .catch((error) => {
            console.log("Error Login :", error.message);
            alert("error" + error.message);
        })
    };
    return (
        <div>
            <h2>Login</h2>
            <input 
               type='email'
               placeholder='Enter your email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
            <input 
                type='password'
                placeholder='Enter your pasdword'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
        </div>
    );
}



export default Login;