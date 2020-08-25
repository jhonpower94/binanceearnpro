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
const paymentInfo = JSON.parse(window.localStorage.getItem("paymentInfo"));



function CreditSucess() {
  const classes = useStyles();
  const depositamount = paymentInfo.amount;
  const dispatch = useDispatch();
  const walletAmount = useSelector(
    (state) => state.locationinfo.locationinfo.wallet_balance
  );
  const currentUserId = useSelector(
    (state) => state.locationinfo.locationinfo.id
  );
  const doc = firestore.doc(`users/${currentUserId}`);
  const newWalletamount = depositamount + walletAmount;
  const isLoading = useSelector((state) => state.loadingpayment);
  const { setIntro } = useContext(AppContext);
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
      dispatch(loading$());
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
        })
        .then(dispatch(loading$()));
    } else {
      navigate("invest");
    }
  }, []);

  return <Container>CreditSucess</Container>;
}

export default CreditSucess;
