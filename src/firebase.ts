import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuos77iJg6tX2UcIuo0P13jVAu9ol_L2Q",
  authDomain: "zxschool.firebaseapp.com",
  projectId: "zxschool",
  storageBucket: "zxschool.firebasestorage.app",
  messagingSenderId: "1088448379741",
  appId: "1:1088448379741:web:367acbc4d357a37beb46b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
