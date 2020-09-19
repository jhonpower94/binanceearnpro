import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyClFdUmgFY5e6Y_GMkA02a2LWP0ML7IG-A",
  authDomain: "admin-fa3ba.firebaseapp.com",
  databaseURL: "https://admin-fa3ba.firebaseio.com",
  projectId: "admin-fa3ba",
  storageBucket: "admin-fa3ba.appspot.com",
  messagingSenderId: "554107235093",
  appId: "1:554107235093:web:ddb295c6cffdcc2ae4571c"
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export { app, auth, firestore, storage, collectionData, docData, loggedIn$ };
export default firebase;
