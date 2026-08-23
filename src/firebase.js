// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq_3HC_bEXhG3_TvEk8-XVzxvcTzHxlqM",
  authDomain: "tourist-safety-fe6b8.firebaseapp.com",
  projectId: "tourist-safety-fe6b8",
  storageBucket: "tourist-safety-fe6b8.firebasestorage.app",
  messagingSenderId: "162683043317",
  appId: "1:162683043317:web:a3d0fdcd3720b4288eb4bc",
  measurementId: "G-KWWR6175S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
