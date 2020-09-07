import React, { useEffect, useContext } from "react";
import { AppContext } from "../../../App";
import { makeStyles, Container } from "@material-ui/core";
import { firestore } from "../../../config";
import { navigate } from "@reach/router";
import { CheckBoxSharp } from "@material-ui/icons";

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
        firestore.doc(`transactions/${updateWalletBalance.transid}`).update({
          pending: false,
        });
      });
  }, []);

  return <Container className={classes.margintop}>Updating wallet <CheckBoxSharp color="primary" /></Container>;
}

export default UpdateWallet;
