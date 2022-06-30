import Coinpayments from "coinpayments";
import { formatLocaleCurrency } from "country-currency-map";
import { ajax } from "rxjs/ajax";
import firebase, { firestore } from "./index";

const CoinpaymentsCredentials = {
  key: "1f6d19f8eaf333cbd4812f313f6c489dd7d8a86480c7726e4f167952c445b10c",
  secret: "62CE5e3315CbF56aB29DD03d7549DE2414E4C2b1d953eeE1e7e8FfC970E18465",
};
export const client = new Coinpayments(CoinpaymentsCredentials);

export const addUsers = (users, id) =>
  firestore.collection("users").doc(id).set(users);

export const addbonus = (userid, username, useremail) => {
  firestore
    .doc(`users/${userid}`)
    .collection("bonus")
    .add({
      amount: 10,
      deposit_amount: 10,
      from: "Unchainedtrade",
      description: "Registration bonus",
      date: new Date().toLocaleDateString(),
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      firestore
        .doc(`users/${userid}`)
        .collection("notification")
        .add({
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          amount: 10,
          type: "Bonus",
        })
        .then(() => {
          const amountnn = formatLocaleCurrency(10, "USD", {
            autoFixed: false,
          });
          ajax({
            url: "https://reinvented-natural-catshark.glitch.me/unchainedtrade",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Hello ${username}, <br/><br/> 
            <strong> Your registration was successful.</strong><br/> You have recieved a registration bonus. <br/><br/>
              Amount:  ${amountnn}`,
              to: `${useremail}, support@unchainedtrader.com`,
              subject: "Bonus Deposit",
            },
          }).subscribe(() => alert("Bonus has been credited"));
        });
    });
};
