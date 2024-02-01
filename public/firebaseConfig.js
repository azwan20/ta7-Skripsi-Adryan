// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHhbPwo2Ukje_vXr9SHRWddW_sud0ETt8",
  authDomain: "adrian-pratama.firebaseapp.com",
  projectId: "adrian-pratama",
  storageBucket: "adrian-pratama.appspot.com",
  messagingSenderId: "363458951384",
  appId: "1:363458951384:web:c7b99c027d7e6eb951ffad",
  measurementId: "G-X24895FY9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };