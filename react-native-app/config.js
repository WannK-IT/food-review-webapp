import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyByDxRO25gjETu_RuUeNACvGYXa0Gf7qLY",
    authDomain: "reviewfood-081299.firebaseapp.com",
    projectId: "reviewfood-081299",
    storageBucket: "reviewfood-081299.appspot.com",
    messagingSenderId: "994403944099",
    appId: "1:994403944099:web:6bd78143d7feb4a2146116",
    measurementId: "G-VX5M7XB6QT"
  };
  
  // Initialize Firebase

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }

  export {firebase};