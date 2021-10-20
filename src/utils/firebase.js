// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBA55mUE8u1oD-hJf8WhywWXyjjKhfAceY",
  authDomain: "sirius-65eb9.firebaseapp.com",
  projectId: "sirius-65eb9",
  storageBucket: "sirius-65eb9.appspot.com",
  messagingSenderId: "993575023061",
  appId: "1:993575023061:web:9597a815b66156f6390d5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInEmailPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
  } catch (error) {
    alert(error);
  }
};

export { app, auth, signInWithGoogle, signInEmailPassword };
