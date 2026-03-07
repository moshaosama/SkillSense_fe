// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7M-bQx9js0pxjE6Xus0N0uY1wLFAmLQE",
  authDomain: "ng-first-project-60d17.firebaseapp.com",
  projectId: "ng-first-project-60d17",
  storageBucket: "ng-first-project-60d17.firebasestorage.app",
  messagingSenderId: "303714344079",
  appId: "1:303714344079:web:f343d1c37efec2925ea4fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
