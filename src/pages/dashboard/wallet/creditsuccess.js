import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { loading$, loadingpayment$ } from "../../../redux/action";
import { makeStyles, Container } from "@material-ui/core";
import firebase, { firestore, auth, docData } from "../../../config";
import { ajax } from "rxjs/ajax";
import { async } from "rxjs/internal/scheduler/async";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
}));

const storageData = JSON.parse(window.localStorage.getItem("userdata"));
const paymentInfostorage = JSON.parse(
  window.localStorage.getItem("paymentInfo")
);

function CreditSucess() {
  const classes = useStyles();
  const { setIntro, paymentInfo } = useContext(AppContext);
  const depositamount = parseInt(paymentInfo.amount);
  const dispatch = useDispatch();
  const walletAmount = useSelector(
    (state) => state.locationinfo.locationinfo.wallet_balance
  );
  const currentUserId = useSelector(
    (state) => state.locationinfo.locationinfo.id
  );
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const doc = firestore.doc(`users/${currentUserId}`);
  const newWalletamount = depositamount + walletAmount;
  const isLoading = useSelector((state) => state.loadingpayment);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    auth.onAuthStateChanged((user) => {
      setUserInfo({ ...userInfo, name: user.displayName, id: user.uid });
    });
    async function getDoc(id) {
      const snapshot = await firestore.collection("users").doc(id).get();
      const data = snapshot.data();
      return data;
    }
    if (isLoading.loading) {
      doc
        .update({
          wallet_balance: newWalletamount,
        })
        .then(() => {
          doc.collection("wallet").add({
            Date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            amount: depositamount,
          });
        });
      firestore.collection("alldeposits").add({
        type: "wallet",
        deposit_amount: depositamount,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        email: userInfos.email,
        firstname: userInfos.firstName,
        lastname: userInfos.lastName,
      });
      firestore.collection("transactions").add({
        type: "wallet deposit",
        pending: false,
        name: "wallet Deposit",
        return_amount: depositamount,
        date: new Date().toLocaleDateString(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: userInfos.email,
        firstname: userInfos.firstName,
        lastname: userInfos.lastName,
      });
    } else {
      navigate("invest");
    }
  }, []);

  return <Container>CreditSucess</Container>;
}

export default CreditSucess;
