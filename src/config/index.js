import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { authState } from "rxfire/auth";
import { collectionData, docData } from "rxfire/firestore";
import { filter } from "rxjs/operators";

const firebaseConfig = {
  apiKey: "AIzaSyCtqUGbYYVMZ9MxotYFa9iNyPq_6qVl96I",
  authDomain: "bpro-20599.firebaseapp.com",
  projectId: "bpro-20599",
  storageBucket: "bpro-20599.appspot.com",
  messagingSenderId: "260830523886",
  appId: "1:260830523886:web:f427957c35aec1bbae1eff"
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
      return "bc1qc20e3lfvrhtaxdm0skryhwemcstfp3dksfjk8w";
    case "USDT":
      return "THo2jXmaNFwNHsegJGPvGsXMoKf1GpuRxv";
    case "BNB":
      return "bnb1f94l8j7f323zknk4yqr74ky9e3y0nqmnxz6tma";
    case "SHIB":
      return "0x51AD6C45B4A448Fa3E81ca52FE8c259934585FCF";

    default:
      return "bc1qc20e3lfvrhtaxdm0skryhwemcstfp3dksfjk8w";
  }
};
