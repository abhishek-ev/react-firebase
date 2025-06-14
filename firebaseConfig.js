// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3T1FD9F6S8Dxe6kVtoF3jwtbJ-m12A0U",
  authDomain: "falooda-nation-c1ee6.firebaseapp.com",
  projectId: "falooda-nation-c1ee6",
  storageBucket: "falooda-nation-c1ee6.firebasestorage.app",
  messagingSenderId: "1001357655451",
  appId: "1:1001357655451:web:e270609f24e77e2c58f53e",
  measurementId: "G-6EF2HD8FHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log("Firestore DB:", db);

export default db;