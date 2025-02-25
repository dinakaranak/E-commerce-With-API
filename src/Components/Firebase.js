// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpEGlnNIBprXsb4D-odYx3-l0w5TQ6bT4",
  authDomain: "e-commerce-6ae7e.firebaseapp.com",
  projectId: "e-commerce-6ae7e",
  storageBucket: "e-commerce-6ae7e.firebasestorage.app",
  messagingSenderId: "261697135227",
  appId: "1:261697135227:web:71ce3b0738519c1deef8de",
  measurementId: "G-XSH5V93TST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };