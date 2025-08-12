// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPlNxy0aL1I5QdpjYYCegklDU-zllDrhA",
  authDomain: "react-social-app-eb4d8.firebaseapp.com",
  projectId: "react-social-app-eb4d8",
  storageBucket: "react-social-app-eb4d8.firebasestorage.app",
  messagingSenderId: "54210699405",
  appId: "1:54210699405:web:743662bc8d3ddc46b342c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll use
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);