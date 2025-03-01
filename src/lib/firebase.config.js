// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyXK7Po-yRX0zgRhn0wxmUXAN9gR_1mKo",
  authDomain: "watchlk.firebaseapp.com",
  projectId: "watchlk",
  storageBucket: "watchlk.firebasestorage.app",
  messagingSenderId: "141063377131",
  appId: "1:141063377131:web:39391b00a9e18501c12eae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
