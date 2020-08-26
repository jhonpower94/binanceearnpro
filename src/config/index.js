import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyDeGgFnprcPu0fryzS4KIjuElibM1fMkJg",
  authDomain: "coinspringinvest.firebaseapp.com",
  databaseURL: "https://coinspringinvest.firebaseio.com",
  projectId: "coinspringinvest",
  storageBucket: "coinspringinvest.appspot.com",
  messagingSenderId: "337977634714",
  appId: "1:337977634714:web:4c2947983842e02bc79423",
  measurementId: "G-V2C6D61ZXQ",
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export { app, auth, firestore, storage, collectionData, docData, loggedIn$ };
export default firebase;
