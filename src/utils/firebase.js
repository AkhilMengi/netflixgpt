// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaQqdRA08sNF-2Dz00k9lyin0OrtKILu0",
  authDomain: "netflixgpt-eea8b.firebaseapp.com",
  projectId: "netflixgpt-eea8b",
  storageBucket: "netflixgpt-eea8b.firebasestorage.app",
  messagingSenderId: "502280431981",
  appId: "1:502280431981:web:c52f33673ec843ea7ed264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const auth = getAuth();