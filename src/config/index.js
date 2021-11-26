import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyD6hib1BaXjvs_E6385CYNqKK2mBqCWbcY",
  authDomain: "cointradecenter-ad3f5.firebaseapp.com",
  projectId: "cointradecenter-ad3f5",
  storageBucket: "cointradecenter-ad3f5.appspot.com",
  messagingSenderId: "770323173522",
  appId: "1:770323173522:web:6fbac7eb57d92d4f52964b"
};
const app = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(app);
const storage = firebase.storage(app);
const auth = firebase.auth(app);
const loggedIn$ = authState(auth).pipe(filter((user) => !!user));

export { app, auth, firestore, storage, collectionData, docData, loggedIn$ };
export default firebase;

export const addresses = (crypto) => {
  switch (crypto) {
    case "BTC":
      return "bc1qrl350neqd7lqsq2atrmt6kznpytpnx309qg773";
    case "ETH":
      return "bc1qrl350neqd7lqsq2atrmt6kznpytpnx309qg773";
    default:
      return "bc1qrl350neqd7lqsq2atrmt6kznpytpnx309qg773";
  }
};
