import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyCXwWM-w1HuBbCTp5y-GJoCc1eHTh_mheA",
  authDomain: "skimasite.firebaseapp.com",
  projectId: "skimasite",
  storageBucket: "skimasite.appspot.com",
  messagingSenderId: "738695526055",
  appId: "1:738695526055:web:7d0d7322f91672a0490d82",
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
      return "15Mr3pKns7iYz82XReWWyznQFsYiYNaJhn";
    case "ETH":
      return "0x2B841e2DD8E65c967dD8935214B1324168563891";
    case "USDT":
      return "0x2B841e2DD8E65c967dD8935214B1324168563891";
    default:
      return "15Mr3pKns7iYz82XReWWyznQFsYiYNaJhn";
  }
};
