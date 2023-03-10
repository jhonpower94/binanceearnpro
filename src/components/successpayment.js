import { Box, Container, makeStyles, Typography } from "@material-ui/core";
import { navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import firebase, { auth, firestore } from "../config";
import Invoice from "../pages/dashboard/invest/invoice";
import { loading$, loadingpayment$ } from "../redux/action";
const { Converter } = require("easy-currencies");

let converter = new Converter(
  "OpenExchangeRates",
  "236dd075cd5245eea8b196f1dd855fff"
);

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
}));

function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

function PaymentSuccess() {
  const classes = useStyles();
  const { paymentInfo } = useContext(AppContext);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const txn_info = useSelector((state) => state.trxinfo);
  const currentUserId = userInfos.id;
  const currencySymbol = JSON.parse(window.localStorage.getItem("country"))
    .currencycode;
  const blockindex = txn_info.blockindex;
  const depositamount = parseInt(paymentInfo.amount);
  const referrerpercent = (5 / 100) * depositamount;

  const dispatch = useDispatch();
  const [valid, setValid] = useState(true);
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

    if (isLoading.loading) {
      const startLoadingSucess = async () => {
        await dispatch(loading$());
      };

      const totalReturn =
        (paymentInfo.block.rate / 100) * depositamount + depositamount;

      startLoadingSucess().then(() => {
        firestore
          .doc(`users/${currentUserId}`)
          .collection("deposits")
          .add({
            block_name: txn_info.block.name,
            deposit_amount: depositamount,
            amount: depositamount,
            userid: currentUserId,
            percentage: paymentInfo.block.rate,
            complete: false,
            date: new Date().toLocaleDateString(),
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            total_return: totalReturn,
          })
          .then((tr) => {
            console.log("transaction added");
            const depositid = tr.id;

            const date = new Date();

            const newDate = addDays(date, paymentInfo.block.duration);

            fetch("https://mega.binanceearnpro.online/plans", {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                blockindex: blockindex,
                deposit_amount: depositamount,
                userid: currentUserId,
                depositid: depositid,
                duration: paymentInfo.block.duration,
                currency: currencySymbol,
                rate: paymentInfo.block.rate,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                user: userInfo.name,
                block_name: txn_info.block.name,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                console.log("started cron");

                dispatch(loadingpayment$());
                const referrer = userInfos.referrer;
                const referrerId = userInfos.referrerid;

                // add to all transaction
                firestore.collection("alldeposits").add({
                  type: "investment",
                  block_name: txn_info.block.name,
                  deposit_amount: depositamount,
                  amount: depositamount,
                  userid: currentUserId,
                  email: userInfos.email,
                  firstname: userInfos.firstName,
                  lastname: userInfos.lastName,
                  currency: userInfos.currencycode,
                  date: new Date().toLocaleDateString(),
                  created_at: firebase.firestore.FieldValue.serverTimestamp(),
                });
                if (referrer) {
                  //add referrer bonus is true
                  firestore
                    .collection("users")
                    .doc(referrerId)
                    .collection("bonus")
                    .add({
                      amount: 5,
                      deposit_amount: 5,
                      from: `${userInfos.firstName} ${userInfos.lastName}`,
                      description: "Referral bonus",
                      date: new Date().toLocaleDateString(),
                      created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                      //add notification to referrer database
                      console.log(`referral added`);
                      firestore
                        .doc(`users/${referrerId}`)
                        .collection("notification")
                        .add({
                          date: new Date().toLocaleDateString(),
                          time: new Date().toLocaleTimeString(),
                          amount: referrerpercent,
                          type: "Bonus",
                        });
                      firestore.doc(`users/${currentUserId}`).update({
                        referrer: false,
                      });
                    })

                    .then(() => {
                      console.log("transactions complete");
                      dispatch(loading$());
                      navigate("complete");
                    });
                } else {
                  dispatch(loading$());
                  navigate("complete");
                }
              })
              .catch((err) => {
                navigate("invoice");
              });
          });
      });
    } else {
      setValid(!valid);
    }
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" m={5}>
        {valid ? (
          <Invoice />
        ) : (
          <Typography variant="body1" color="error">
            error transaction
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default PaymentSuccess;
