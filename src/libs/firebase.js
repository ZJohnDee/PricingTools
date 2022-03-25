import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCXH5cEr4mw29H81FTH53lg2Kapk-ancJ4",

  authDomain: "pricingtool-99f81.firebaseapp.com",

  projectId: "pricingtool-99f81",

  storageBucket: "pricingtool-99f81.appspot.com",

  messagingSenderId: "382227721518",

  appId: "1:382227721518:web:b87117ef1d27f6f6ed1ebf"

};


if (!firebase.apps.length)
{
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();



export const loginWithGoogle = async () =>
{
  await auth.signInWithPopup(googleAuthProvider);
}

export const logout = async() =>
{
  await auth.signOut();
}




