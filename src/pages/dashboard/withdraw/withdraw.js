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
  Avatar,
  Typography,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { ajax } from "rxjs/ajax";
import { navigate } from "@reach/router";
import { AccountBalanceWallet } from "@material-ui/icons";
import getSymbolFromCurrency from "currency-symbol-map";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    background: "#fafafa",
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const prefix = getSymbolFromCurrency(userInfos.currencycode);
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
      prefix={prefix}
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
  const currentStrings = useSelector((state) => state.language);
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
    console.log(userInfos.btcaddress);
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
          return_amount: parseInt(value.amount),
          date: new Date().toLocaleDateString(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: userInfos.email,
          firstname: userInfos.firstName,
          lastname: userInfos.lastName,
          currency: userInfos.currencycode,
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
            url:
              "https://32ef-105-112-177-136.ngrok.io/unchainedtrade",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              ${currentStrings.emailmessages.withdraw.a} ${amountnn} ${currentStrings.emailmessages.withdraw.b} 
              (${value.address}).<br/>
              ${currentStrings.emailmessages.withdraw.a}.
              `,
              to: `${userInfos.email}, admin@unchainedtrade.com`,
              subject: currentStrings.emailmessages.withdraw.subject,
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
    <Container maxWidth="md">
      <Grid container spacing={5} justify="center">
        <Grid item xs={12} sm={12}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar variant="rounded" className={classes.avatar}>
                  <AccountBalanceWallet />
                </Avatar>
              }
              title={currentStrings.Dashboard.withdraw.wallet_balance}
              subheader={
                isNaN(userInfos.wallet_balance) ? (
                  <Typography variant="h4">
                    {formatLocaleCurrency(0, userInfos.currencycode, {
                      autoFixed: false,
                    })}
                  </Typography>
                ) : (
                  <Typography variant="h4">
                    {formatLocaleCurrency(
                      userInfos.wallet_balance,
                      userInfos.currencycode,
                      {
                        autoFixed: false,
                      }
                    )}
                  </Typography>
                )
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <form onSubmit={submitForm}>
            <Grid container spacing={5} justify="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="outlined-read-only-input"
                  label={currentStrings.Dashboard.withdraw.adress_label}
                  name="address"
                  defaultValue={value.address}
                  variant="standard"
                  onChange={changeValue}
                  helperText={currentStrings.Dashboard.withdraw.helpertext_btc}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  size="small"
                  fullWidth
                  id="outlined-number"
                  label={currentStrings.Dashboard.withdraw.amount}
                  name="amount"
                  defaultValue={value.amount}
                  variant="standard"
                  onChange={changeValue}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  helperText={
                    error
                      ? currentStrings.Dashboard.withdraw.error_amount
                      : currentStrings.Dashboard.withdraw.helpertext_amount
                  }
                  error={error ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  {currentStrings.Dashboard.withdraw.action}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Withdrawform;
