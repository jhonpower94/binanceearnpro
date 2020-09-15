import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import firebase, { firestore } from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import { loading$, selectedmenuItem$ } from "../../../redux/action";
import { AppContext } from "../../../App";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { ajax } from "rxjs/ajax";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Withdrawform() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const { setIntro } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [value, setValue] = useState({
    amount: userInfos.wallet_balance,
    address: userInfos.btcaddress,
  });

  const changeValue = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(5));
  }, []);

  const submitForm = (e) => {
    e.preventDefault();

    if (value.amount > userInfos.wallet_balance) {
      setError(true);
    } else {
      dispatch(loading$());
      firestore
        .collection("transactions")
        .add({
          type: "Deposit withdrawal",
          action: "withdrawal",
          pending: true,
          isdeposit: true,
          name: "Wallet withdrawal",
          return_amount: value.amount,
          date: new Date().toLocaleDateString(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: userInfos.email,
          firstname: userInfos.firstName,
          lastname: userInfos.lastName,
        })
        .then(() => {
          const newamountnn = userInfos.wallet_balance - parseInt(value.amount);
          const amountnn = formatLocaleCurrency(value.amount, "USD", {
            autoFixed: false,
          });
          firestore.doc(`users/${userInfos.id}`).update({
            wallet_balance: newamountnn,
          });
          ajax({
            url: "http://localhost:9000/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Hi ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              You have successfully placed a wallet withdrawal request of ${amountnn} to your BTC wallet 
              (${value.address}).<br/><br/>
              Please exercise patience while we process your transaction<br/><br/>
              Thanks. 
              `,
              to: `${userInfos.email}, support@coinspringinvest.net`,
              subject: "Withdrawal",
            },
          }).subscribe(() => {
            dispatch(loading$());
            console.log("user message sent");
            navigate("complete");
          });
        });
    }
  };

  const walletBalance = isNaN(userInfos.wallet_balance)
    ? formatLocaleCurrency(0, "USD", {
        autoFixed: false,
      })
    : formatLocaleCurrency(userInfos.wallet_balance, "USD", {
        autoFixed: false,
      });

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardHeader
          title={
            isNaN(userInfos.wallet_balance)
              ? formatLocaleCurrency(0, "USD", {
                  autoFixed: false,
                })
              : formatLocaleCurrency(userInfos.wallet_balance, "USD", {
                  autoFixed: false,
                })
          }
          subheader="Remaing balance"
        />
        <CardContent>
          <form onSubmit={submitForm}>
            <Grid container spacing={5} justify="center">
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="BTC Address"
                  name="address"
                  defaultValue={value.address}
                  variant="outlined"
                  onChange={changeValue}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="outlined-number"
                  label="Amount"
                  name="amount"
                  defaultValue={value.amount}
                  variant="outlined"
                  onChange={changeValue}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  helperText={error ? "not enough amount" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  fullWidth
                >
                  withdraw deposits
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Withdrawform;
