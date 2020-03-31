import firebase from "firebase/app";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyDgsyL4bOah6jZlISpvGa8Y2c-D6BIjjRQ",
  authDomain: "todo-ninja-3a369.firebaseapp.com",
  databaseURL: "https://todo-ninja-3a369.firebaseio.com",
  projectId: "todo-ninja-3a369",
  storageBucket: "todo-ninja-3a369.appspot.com",
  messagingSenderId: "231286252804",
  appId: "1:231286252804:web:f160abb3c53c5a1e90dc51",
  measurementId: "G-ZFDCX2VX11"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
