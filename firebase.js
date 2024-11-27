
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdmJ4ZrN8Nw9qpY3_YzHbupslR9cEbt7Y",
  authDomain: "bctt-aaf64.firebaseapp.com",
  projectId: "bctt-aaf64",
  storageBucket: "bctt-aaf64.firebasestorage.app",
  messagingSenderId: "927583771265",
  appId: "1:927583771265:web:6c7de621ac6da31f6b4b80",
  measurementId: "G-DQ9PHFYF94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };