// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF7Yl_EQSb56X9MDRnAAJ8-y32CaYjQqk",
  authDomain: "jp-prueba-2634d.firebaseapp.com",
  databaseURL: "https://jp-prueba-2634d-default-rtdb.firebaseio.com",
  projectId: "jp-prueba-2634d",
  storageBucket: "jp-prueba-2634d.appspot.com",
  messagingSenderId: "966151939316",
  appId: "1:966151939316:web:eb5e3fe13c91b00fcbeaa1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getDatabase(app); 

export { auth, db};