import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { CancelSharp, CheckSharp } from "@material-ui/icons";
import firebase, { firestore } from "../../../config";
import { ajax } from "rxjs/ajax";
import { loading$ } from "../../../redux/action";
import { navigate } from "@reach/router";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function BtcAddressInput(props) {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    address: userInfos.btcaddress,
    amount: 0,
  });
  const [err, setErr] = useState({
    status: false,
    text: "",
  });
  const { data, selected, type } = props;

  useEffect(() => {}, []);

  const withdrawBonus = (data, address) => {
    if (value.amount > data.return_amount) {
      setErr({ ...err, status: true, text: "Insufficient withdrawal" });
    } else {
      if (value.amount == 0) {
        setErr({
          ...err,
          status: true,
          text: "Amount cannot be lesser than 1",
        });
      } else {
        dispatch(loading$());
        console.log(data.id);
        const remainingBonus = data.amount - value.amount;
        firestore
          .doc(`users/${userInfos.id}`)
          .collection("bonus")
          .doc(data.id)
          .update({
            deposit_amount: remainingBonus,
            //  withdrawn: true,
          })
          .then(() => {
            firestore
              .collection("transactions")
              .add({
                type: "Bonus withdrawal",
                action: "withdrawal",
                pending: true,
                name: "Bonus withdrawal",
                return_amount: parseInt(data.amount),
                date: new Date().toLocaleDateString(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                email: userInfos.email,
                firstname: userInfos.firstName,
                lastname: userInfos.lastName,
                currency: "USD",
              })
              .then(() => {
                const amountnn = formatLocaleCurrency(data.amount, "USD", {
                  autoFixed: false,
                });
                ajax({
                  url:
                    "https://us-central1-bchunters-9ea45.cloudfunctions.net/skimasite/mail",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: {
                    message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName} <br><br/>
                    ${currentStrings.emailmessages.address.a} ${value.amount} ${currentStrings.emailmessages.address.b} ${address}.<br/><br/>
                    ${currentStrings.emailmessages.address.c}`,
                    to: `${userInfos.email}, support@cryptotradecentral.co`,
                    subject: currentStrings.emailmessages.address.subject_bonus,
                  },
                }).subscribe(() => {
                  console.log("message sent");
                  dispatch(loading$());
                  navigate("complete");
                });
              });
          });
      }
    }
  };

  const withdraw = (data, address) => {
    if (value.amount > data.return_amount) {
      setErr({ ...err, status: true, text: "Insufficient withdrawal" });
    } else {
      if (value.amount == 0) {
        setErr({
          ...err,
          status: true,
          text: "Amount cannot be lesser than 1",
        });
      } else {
        dispatch(loading$());

        firestore
          .collection("transactions")
          .add({
            type: "Plan withdrawal",
            action: "withdrawal",
            pending: true,
            name: data.block_name,
            return_amount: data.return_amount,
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: userInfos.email,
            firstname: userInfos.firstName,
            lastname: userInfos.lastName,
            currency: userInfos.currencycode,
          })
          .then(() => {
            const amountnn = formatLocaleCurrency(data.return_amount, "USD", {
              autoFixed: false,
            });

            const remainingAmount = data.return_amount - value.amount;

            firestore
              .doc(`users/${userInfos.id}`)
              .collection("deposits")
              .doc(data.id)
              .update({
                return_amount: remainingAmount,
                //  withdrawn: true,
              });

            ajax({
              url:
                "https://us-central1-bchunters-9ea45.cloudfunctions.net/skimasite/mail",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              ${currentStrings.emailmessages.address.a} ${value.amount} ${currentStrings.emailmessages.address.b} ${address}.<br/><br/>
              ${currentStrings.emailmessages.address.c}
              `,
                to: `${userInfos.email}, support@cryptotradecentral.co`,
                subject: currentStrings.emailmessages.address.subject_withdraw,
              },
            }).subscribe(() => {
              console.log("user message sent");
              dispatch(loading$());
              navigate("complete");
            });
          });
      }
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (type === "investment") {
      withdraw(data, value.address);
    } else {
      withdrawBonus(data, value.address);
    }
  };

  const changeAdress = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const changAmount = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth="sm" className={classes.margintop}>
      <form onSubmit={submitForm}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={12}>
            <TextField
              required
              size="small"
              fullWidth
              id="outlined-number"
              label={currentStrings.Dashboard.withdraw.adress_label}
              name="address"
              defaultValue={value.address}
              variant="standard"
              onChange={changeAdress}
              helperText={currentStrings.Dashboard.withdraw.helpertext_btc}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              required
              size="small"
              fullWidth
              id="outlined-number"
              label={currentStrings.Dashboard.investments.amount}
              name="amount"
              defaultValue={value.amount}
              variant="standard"
              onChange={changAmount}
              helperText={
                err.status
                  ? err.text
                  : currentStrings.Dashboard.withdraw.helpertext_btc
              }
              error={err.status}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              variant="outlined"
              startIcon={<CancelSharp />}
              color="inherit"
              size="large"
              fullWidth
              onClick={selected}
            >
              {currentStrings.Dashboard.address.cancel}
            </Button>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<CheckSharp />}
              color="primary"
              size="large"
              fullWidth
            >
              {currentStrings.Dashboard.address.confirm}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default BtcAddressInput;
