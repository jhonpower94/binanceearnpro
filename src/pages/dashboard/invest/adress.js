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
  });
  const { data, selected, type } = props;

  useEffect(() => {}, []);

  const withdrawBonus = (data, address) => {
    dispatch(loading$());
    console.log(data.id);
    firestore
      .doc(`users/${userInfos.id}`)
      .collection("bonus")
      .doc(data.id)
      .update({
        deposit_amount: 0,
        withdrawn: true,
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
          })
          .then(() => {
            const amountnn = formatLocaleCurrency(data.amount, "USD", {
              autoFixed: false,
            });
            ajax({
              url: "https://coinspringinvest.herokuapp.com/mail",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `Hi ${userInfos.firstName} ${userInfos.lastName} <br><br/>
                You have successfully placed a withdrawal request of ${amountnn} to your BTC wallet ${address}.<br/><br/>
                Please exercise patience while we process your transaction<br/><br/>
                Thanks. `,
                to: `${userInfos.email}, support@coininvest.net`,
                subject: "Bonus withdrawal",
              },
            }).subscribe(() => {
              console.log("message sent");
              dispatch(loading$());
              navigate("../complete");
            });
          });
      });
  };

  const withdraw = (data, address) => {
    console.log(address);

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
      })
      .then(() => {
        const amountnn = formatLocaleCurrency(data.return_amount, "USD", {
          autoFixed: false,
        });
        firestore
          .doc(`users/${userInfos.id}`)
          .collection("deposits")
          .doc(data.id)
          .update({
            return_amount: 0,
            withdrawn: true,
          });

        ajax({
          url: "https://coinspringinvest.herokuapp.com/mail",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            message: `Hi ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              You have successfully placed a withdrawal request of ${amountnn} to your this bitcoin address ${address}.<br/><br/>
              Please exercise patience while we process your transaction<br/><br/>
              Thanks. 
              `,
            to: `${userInfos.email}, support@coininvest.net`,
            subject: "Withdrawal",
          },
        }).subscribe(() => console.log("user message sent"));
      });
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
          <Grid item xs={6} sm={6}>
            <Button
              variant="outlined"
              startIcon={<CancelSharp />}
              color="secondary"
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
