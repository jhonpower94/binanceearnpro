import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyBXQ2SQ12nrGC2Ou8ToCUH1TbbUdVwIFIM",
  authDomain: "unchainedtrade-a4ee3.firebaseapp.com",
  projectId: "unchainedtrade-a4ee3",
  storageBucket: "unchainedtrade-a4ee3.appspot.com",
  messagingSenderId: "205375798344",
  appId: "1:205375798344:web:f463b7218fff4ddc93ec7d"
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
