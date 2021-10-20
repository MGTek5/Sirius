// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";

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

const signInWithGoogle = async (history) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    toast.success(`Welcome back, ${res.user.displayName}!`);
    history.push("/");
  } catch (error) {
    console.error(error);
    toast.error("Could not sign in with Google", { position: "top-center" });
    throw error;
  }
};

const signInEmailPassword = async (email, password, history) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Welcome back, ${res.user.displayName}!`);
    history.push("/");
  } catch (error) {
    console.error(error);
    toast.error("Could not authenticate with given values", {
      position: "top-center",
    });
    throw error;
  }
};

export { app, auth, signInWithGoogle, signInEmailPassword };
