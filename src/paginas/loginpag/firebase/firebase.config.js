import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD5Q4LD7F8ypr-za04xmDyAm9m4dyCedK8",
  authDomain: "medicamentos-9058a.firebaseapp.com",
  projectId: "medicamentos-9058a",
  storageBucket: "medicamentos-9058a.appspot.com",
  messagingSenderId: "76406187442",
  appId: "1:76406187442:web:1649203500985055ddb0ab",
  measurementId: "G-QE15KGQXCB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)