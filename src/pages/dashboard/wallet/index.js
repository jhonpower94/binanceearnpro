import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  loading$,
  selectedmenuItem$,
  transactionInfo$,
} from "../../../redux/action";
import {
  makeStyles,
  Container,
  Grid,
  Card,
  Paper,
  CardHeader,
  CardContent,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  ListItem,
  MenuItem,
  TextField,
  Button,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { client } from "../../../config/services";
import { navigate } from "@reach/router";
import { Converter } from "easy-currencies";
import { reactLocalStorage } from "reactjs-localstorage";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import firebase, { firestore } from "../../../config";
import { ajax } from "rxjs/ajax";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  AccountBalanceWallet,
  AccountBalanceWalletOutlined,
} from "@material-ui/icons";
import NumberFormat from "react-number-format";
var formatCurrency = require("country-currency-map").formatCurrency;

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  bgheader: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#1835c0"),
  },
  avatar: {
    background: theme.palette.secondary.main,
  },
}));

const currencies = [
  {
    value: "BTC",
    label: "Bitcoin",
  },
  {
    value: "ETH",
    label: "Etherieum",
  },
  {
    value: "BTCC",
    label: "Bitcoin cash",
  },
  {
    value: "LTC",
    label: "litecoin",
  },
];

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

function Wallet() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const defaultCurrency = JSON.parse(window.localStorage.getItem("country"))
    .currencycode;
  const dispatch = useDispatch();

  const { paymentInfo, setPaymentInfo, user } = useContext(AppContext);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const [minimum_deposit, setMinimum_deposit] = useState();
  const [amounterr, setAmountErr] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(4));

    // setPaymentInfo({ ...paymentInfo, amount: 50 });
    setMinimum_deposit(50);
  }, []);

  const addcredit = (e) => {
    e.preventDefault();

    dispatch(loading$());
    if (paymentInfo.amount >= minimum_deposit) {
      firestore
        .collection("transactions")
        .add({
          userid: userInfos.id,
          type: "wallet deposit",
          pending: true,
          name: "wallet Deposit",
          return_amount: parseInt(paymentInfo.amount),
          date: new Date().toLocaleDateString(),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: userInfos.email,
          firstname: userInfos.firstName,
          lastname: userInfos.lastName,
        })
        .then(() => {
          const amountnn = formatLocaleCurrency(paymentInfo.amount, "USD", {
            autoFixed: false,
          });
          ajax({
            url: "https://coinspringinvest.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Send exact payment to this address: \n 
              1HE8YvirstUtKUVQ1khvkJ4SpHgCLW2ca7 <br/><br/>
              <img src="https://www.coininvest.net/qrcode.png" height="150" /><br/><br/>
              Amount: ${amountnn} <br/><br/>
              once payment is done, send notification to live support or email support at 
              <a>support@coininvest.net</a>
              to notify us of successful deposit.`,
              to: userInfos.email,
              subject: "Deposit",
            },
          }).subscribe(() => console.log("user message sent"));
          ajax({
            url: "https://coinspringinvest.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `incoming deposit request from ${userInfos.firstName} ${userInfos.lastName}, total deposit amount : $${paymentInfo.amount}`,
              to: "support@coininvest.net",
              subject: "New Deposit",
            },
          }).subscribe(() => {
            console.log("message sent");
            dispatch(loading$());
            navigate("payment_wallet");
          });
        });
    } else {
      setAmountErr(true);
      dispatch(loading$());
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={5} justify="center">
        <Grid item xs={12} sm={12}>
          <CardHeader
            avatar={
              <Avatar variant="rounded" className={classes.avatar}>
                <AccountBalanceWallet />
              </Avatar>
            }
            title={currentStrings.Dashboard.withdraw.wallet_balance}
            subheader={
              <Typography variant="h4">
                {formatLocaleCurrency(userInfos.wallet_balance, "USD", {
                  autoFixed: false,
                })}
              </Typography>
            }
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <form onSubmit={addcredit}>
            <Grid container spacing={5} justify="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-number"
                  label={currentStrings.Dashboard.withdraw.amount}
                  name="amount"
                  defaultValue={Math.floor(paymentInfo.amount)}
                  variant="standard"
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      amount: e.target.value,
                    })
                  }
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  helperText={
                    amounterr
                      ? currentStrings.Dashboard.deposit.error_amount
                      : currentStrings.Dashboard.deposit.helpertext_amount
                  }
                  error={amounterr ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  size="small"
                  label={currentStrings.Dashboard.deposit.currency_lable}
                  value={paymentInfo.cryptoType}
                  onChange={(e) =>
                    setPaymentInfo({
                      ...paymentInfo,
                      cryptoType: e.target.value,
                    })
                  }
                  helperText={
                    currentStrings.Dashboard.deposit.helpertext_currency
                  }
                  variant="standard"
                  fullWidth
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  { currentStrings.Dashboard.deposit.action_btn }
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Alert severity="info">
            <AlertTitle>
              {currentStrings.Dashboard.deposit.alert_title}
            </AlertTitle>

            {formatLocaleCurrency(minimum_deposit, "USD", {
              autoFixed: false,
            })}
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Wallet;
