// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyAZcnw7SpN0WmD6Ux6IE4-y0-n3pEWKqco",
  authDomain: "chat-app-1acec.firebaseapp.com",
  projectId: "chat-app-1acec",
  storageBucket: "chat-app-1acec.appspot.com",
  messagingSenderId: "167867927150",
  appId: "1:167867927150:web:84bc699e630e103557f47f",
  databaseURL: 'https://chat-app-1acec-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

// Initialize Firebase
const app = firebase.initializeApp(config);

export const auth = app.auth();

export const database = app.database();

export const storage = app.storage()

