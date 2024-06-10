// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL2qBCc-pEOX-MIOnRG2wZsQkTVq1ENdQ",
  authDomain: "hrms-43149.firebaseapp.com",
  databaseURL: "https://hrms-43149-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hrms-43149",
  storageBucket: "hrms-43149.appspot.com",
  messagingSenderId: "211590354476",
  appId: "1:211590354476:web:e4796a85d1c92bd2a5e389",
  measurementId: "G-HT1SXGGMHJ"
};

// Initialize Firebase

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);

export { db };