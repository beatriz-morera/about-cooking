import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAM9DrKq0kPTEjn1mcm5pVxge9LbmCYhu8",
  authDomain: "about-cooking.firebaseapp.com",
  projectId: "about-cooking",
  storageBucket: "about-cooking.appspot.com",
  messagingSenderId: "207258464459",
  appId: "1:207258464459:web:68bc93ca3789f8863beb4e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

export {firebase, auth, db, storage}



