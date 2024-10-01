// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlzZBy7SZLXPM26Bx3TWncEjqyotqbPjs",
  authDomain: "mobileapp-7a44d.firebaseapp.com",
  projectId: "mobileapp-7a44d",
  storageBucket: "mobileapp-7a44d.appspot.com",
  messagingSenderId: "689045379418",
  appId: "1:689045379418:web:e034c7b4450249cdc1bb63",
  measurementId: "G-CFT2WDKN1T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);