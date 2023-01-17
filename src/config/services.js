import { formatLocaleCurrency } from "country-currency-map";
import { ajax } from "rxjs/ajax";
import firebase, { firestore } from "./index";

export const addUsers = (users, id) =>
  firestore
    .collection("users")
    .doc(id)
    .set(users);

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
            url: "https://mega.binanceearnpro.online/sendmail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Hello ${username}, <br/><br/> 
            <strong> Your registration was successful.</strong><br/> You have received a registration bonus. <br/>
              Amount:  ${amountnn}`,
              to: `${useremail}, service@binanceearnpro.online`,
              subject: "Bonus Deposit",
            },
          }).subscribe(() => alert("Bonus has been credited"));
        });
    });
};
