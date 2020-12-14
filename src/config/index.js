import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyAhzbLFtj3J_ubXZmtkVH61S3aqbzHfK2Y",
  authDomain: "hotblockinvest.firebaseapp.com",
  databaseURL: "https://hotblockinvest.firebaseio.com",
  projectId: "hotblockinvest",
  storageBucket: "hotblockinvest.appspot.com",
  messagingSenderId: "468239244770",
  appId: "1:468239244770:web:035adf1ad39d02a9ea2dbb",
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export { app, auth, firestore, storage, collectionData, docData, loggedIn$ };
export default firebase;
