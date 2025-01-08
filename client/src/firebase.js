// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "workout-collection.firebaseapp.com",
  projectId: "workout-collection",
  storageBucket: "workout-collection.appspot.com",
  messagingSenderId: "405410590630",
  appId: "1:405410590630:web:6567c252eb263867712967",
  measurementId: "G-N4LTCBQKPL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
