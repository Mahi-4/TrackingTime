// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnsYIAHKsmV2YreW7UPT9il5vqA9WxeFA",
  authDomain: "loginform-79f3c.firebaseapp.com",
  projectId: "loginform-79f3c",
  storageBucket: "loginform-79f3c.appspot.com",
  messagingSenderId: "854976324641",
  appId: "1:854976324641:web:a6bbd6d671a59b7c706f60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app; 