import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import { makeStyles, Container } from "@material-ui/core";
import { firestore } from "../../../config";
import { navigate } from "@reach/router";
import { CheckBoxSharp } from "@material-ui/icons";
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
        wallet_balance: updateWalletBalance.newamount,
      })
      .then(() => {
        setupdateWalletBalance({ status: true });
        firestore
          .doc(`transactions/${updateWalletBalance.transid}`)
          .update({
            pending: false,
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
              url: "https://hotblockexpressapi.herokuapp.com/mail",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `your Deposit has been successfully updated <br/><br/>
              Description: Account Wallet Deposit <br/>
              Amount: ${amountnn} <br/>
              Status <p style="color: #06b956;">successful</p></p>`,
                to: `${updateWalletBalance.email}, support@coinspringinvest.net`,
                subject: "Transaction update",
              },
            }).subscribe(() => console.log("user message sent"));
          });
      });
  }, []);

  return (
    <Container className={classes.margintop}>
      Updating wallet <CheckBoxSharp color="primary" />
    </Container>
  );
}

export default UpdateWallet;
