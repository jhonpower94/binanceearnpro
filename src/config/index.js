import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyAvue4Nuo9hVT9ex5TGGsx0EB-fDxkATbQ",
  authDomain: "hotblock-48cbf.firebaseapp.com",
  databaseURL: "https://hotblock-48cbf.firebaseio.com",
  projectId: "hotblock-48cbf",
  storageBucket: "hotblock-48cbf.appspot.com",
  messagingSenderId: "569044229872",
  appId: "1:569044229872:web:2ef373868892454c286c35",
  measurementId: "G-VS2EM66FF2",
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export { app, auth, firestore, storage, collectionData, docData, loggedIn$ };
export default firebase;
