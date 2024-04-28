// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-auth-4651a.firebaseapp.com",
  projectId: "mern-auth-4651a",
  storageBucket: "mern-auth-4651a.appspot.com",
  messagingSenderId: "1003686073457",
  appId: "1:1003686073457:web:702cbdb66887c1e01537d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
