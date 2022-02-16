import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import { makeStyles, Container } from "@material-ui/core";
import { firestore } from "../../../config";
import { navigate } from "@reach/router";
import { CheckBoxSharp, CancelSharp } from "@material-ui/icons";
import { ajax } from "rxjs/ajax";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function UpdateWallet() {
  const classes = useStyles();
  const { updateWalletBalance, setupdateWalletBalance } = useContext(
    AppContext
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(updateWalletBalance);
    // update wallet deposit balance

    firestore
      .doc(`users/${updateWalletBalance.userid}`)
      .update({
        wallet_balance: updateWalletBalance.currentAmount,
      })
      .then(() => {
        setupdateWalletBalance({ status: true });
        firestore
          .doc(`transactions/${updateWalletBalance.transid}`)
          .update({
            pending: updateWalletBalance.pending,
          })
          .then(() => {
            const amountnn = formatLocaleCurrency(
              updateWalletBalance.newamount,
              "USD",
              {
                autoFixed: false,
              }
            );
            ajax({
              url: "https://32ef-105-112-177-136.ngrok.io/unchainedtrade",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `your Deposit has been ${
                  updateWalletBalance.pending
                    ? "canceled"
                    : "successfully updated"
                }  <br/><br/>
              Description: Account Wallet Deposit <br/>
              Amount: ${amountnn} <br/>
              Status ${
                updateWalletBalance.pending
                  ? "<p style='color: #f44336;'>Canceled</p></p>"
                  : "<p style='color: #06b956;'>successful</p></p>"
              }`,
                to: `${updateWalletBalance.email}, admin@unchainedtrade.com`,
                subject: "Transaction update",
              },
            }).subscribe(() => {
              if (updateWalletBalance.delete) {
                firestore
                  .doc(`transactions/${updateWalletBalance.transid}`)
                  .delete();
              }
              console.log("user message sent");
              setTimeout(() => {
                window.location.href = "../manager";
              }, 2000);
            });
          });
      });
  }, []);

  return (
    <Container className={classes.margintop}>
      Updating wallet{" "}
      {updateWalletBalance.pending ? (
        <CancelSharp color="error" />
      ) : (
        <CheckBoxSharp color="primary" />
      )}
    </Container>
  );
}

export default UpdateWallet;
