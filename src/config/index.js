import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyBPRk29HqgHPZgrOIh02OfW7ZM1O4ycHS4",
  authDomain: "binanceearnpro.firebaseapp.com",
  projectId: "binanceearnpro",
  storageBucket: "binanceearnpro.appspot.com",
  messagingSenderId: "204747719941",
  appId: "1:204747719941:web:c04af0e01ace7efcaae36c",
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
      return "bc1qk4sf5ae0s85wv9x3h3gfdhgn8t0w23lqknakny";
    case "ETH":
      return "0x0F4b6467787Fa73f8d195d30aF56d277c3788d58";
    case "USDT":
      return "0x0F4b6467787Fa73f8d195d30aF56d277c3788d58";
    case "BNB":
      return "0x0F4b6467787Fa73f8d195d30aF56d277c3788d58";

    case "Perfect money":
      return "U15924213";

    case "SHIB":
      return "0x0F4b6467787Fa73f8d195d30aF56d277c3788d58";

    default:
      return "bc1qk4sf5ae0s85wv9x3h3gfdhgn8t0w23lqknakny";
  }
};
