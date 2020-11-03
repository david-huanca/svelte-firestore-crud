import firebase from 'firebase/app'
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDEhKFMUCIkaoCO_Uy3uO9ilavaQfrFJpM",
    authDomain: "svelte-crud-3b48c.firebaseapp.com",
    databaseURL: "https://svelte-crud-3b48c.firebaseio.com",
    projectId: "svelte-crud-3b48c",
    storageBucket: "svelte-crud-3b48c.appspot.com",
    messagingSenderId: "452080564883",
    appId: "1:452080564883:web:065186cffaa984d5aaab66"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export const db = firebase.firestore()