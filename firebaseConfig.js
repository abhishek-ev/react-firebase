// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnYY9R9m_B45X9Ngp9ITrHT3y1mOGK17E",
  authDomain: "react-firebase-8e9b6.firebaseapp.com",
  databaseURL: "https://react-firebase-8e9b6-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "react-firebase-8e9b6",
  storageBucket: "react-firebase-8e9b6.firebasestorage.app",
  messagingSenderId: "93216089725",
  appId: "1:93216089725:web:230d75119180329d307314",
  measurementId: "G-TT29W4VY56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);