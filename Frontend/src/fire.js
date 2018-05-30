import firebase from 'firebase';

var config = {
    apiKey            : "AIzaSyD-bjotBLvk0-Ybeckh56SCRDaoB_skhnc",
    authDomain        : "login-bfaf0.firebaseapp.com",
    databaseURL       : "https://login-bfaf0.firebaseio.com",
    projectId         : "login-bfaf0",
    storageBucket     : "login-bfaf0.appspot.com",
    messagingSenderId : "1032887667101"
  };
firebase.initializeApp(config);

export const ref      = firebase.database().ref();
export const auth     = firebase.auth;
export const providergoogle = new 
firebase.auth.GoogleAuthProvider();
export const providerfacebook = new 
firebase.auth.FacebookAuthProvider();
