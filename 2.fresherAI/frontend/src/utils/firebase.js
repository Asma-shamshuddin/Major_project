
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewproject-3421b.firebaseapp.com",
  projectId: "interviewproject-3421b",
  storageBucket: "interviewproject-3421b.firebasestorage.app",
  messagingSenderId: "365594777290",
  appId: "1:365594777290:web:31c877f82520992c900633"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}