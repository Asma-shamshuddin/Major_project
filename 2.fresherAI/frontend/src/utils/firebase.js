
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "demointerview-11db2.firebaseapp.com",
  projectId: "demointerview-11db2",
  storageBucket: "demointerview-11db2.firebasestorage.app",
  messagingSenderId: "1074238859408",
  appId: "1:1074238859408:web:c52559a1d993d0ea3d9015"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}