import React, { useEffect, useContext, useState } from "react";
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
} from "@material-ui/core";
import { client } from "../../../config/services";
import { navigate } from "@reach/router";
import { Converter } from "easy-currencies";
import { reactLocalStorage } from "reactjs-localstorage";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import firebase, { firestore } from "../../../config";
import { ajax } from "rxjs/ajax";
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

function Wallet() {
  const classes = useStyles();
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

    setPaymentInfo({ ...paymentInfo, amount: 50 });
    setMinimum_deposit(50);
  }, []);

  const CoinpaymentsCreateTransactionOpts = {
    currency1: "USD",
    currency2: paymentInfo.cryptoType,
    address: "1HE8YvirstUtKUVQ1khvkJ4SpHgCLW2ca7",
    amount: paymentInfo.amount,
    buyer_email: "jhonsnow751@gmail.com",
  };

  const storagedata = reactLocalStorage.getObject("paymentInfo");

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
          const amountnn = formatLocaleCurrency(
            paymentInfo.amount,
            "USD",
            {
              autoFixed: false,
            }
          );
          ajax({
            url: "https://admindigitalocean.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Send exact payment to this address: \n 
              1HE8YvirstUtKUVQ1khvkJ4SpHgCLW2ca7 <br/><br/>
              <img src="https://www.coinspringinvest.net/qrcode.png" height="150" /><br/><br/>
              Amount: ${amountnn} <br/><br/>
              once payment is done, send notification to live support or email support at 
              <a>support@coinspringinvest.net</a>
              to notify us of successful deposit.`,
              to: userInfos.email,
              subject: "Deposit"
            },
          }).subscribe(() => console.log("user message sent"));
          ajax({
            url: "https://hotblockexpressapi.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `incoming deposit request from ${userInfos.firstName} ${userInfos.lastName}, total deposit amount : $${paymentInfo.amount}`,
              to: "support@coinspringinvest.net",
              subject: "New Deposit"
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
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="My wallet" className={classes.bgheader} />
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4">
                  {formatLocaleCurrency(user.wallet_balance, "USD", {
                    autoFixed: false,
                  })}
                </Typography>
                <Typography variant="body1">
                  Remaining wallet balance
                </Typography>
              </Box>
              <ListItem>
                <ListItemText primary="Minimum Deposit" />
                <Typography variant="h6">
                  {formatLocaleCurrency(minimum_deposit, "USD", {
                    autoFixed: false,
                  })}
                </Typography>
              </ListItem>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Credit wallet" className={classes.bgheader} />
            <CardContent>
              <Box m={2}>
                <form onSubmit={addcredit}>
                  <ListItem>
                    <FormControl
                      className={classes.margin}
                      variant="outlined"
                      size="small"
                      required
                      fullWidth
                    >
                      <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        value={Math.floor(paymentInfo.amount)}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            amount: e.target.value,
                          })
                        }
                        startAdornment={
                          <InputAdornment position="start">
                            USD
                          </InputAdornment>
                        }
                        labelWidth={60}
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="outlined-select-currency"
                      select
                      size="small"
                      label="Currency"
                      value={paymentInfo.cryptoType}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          cryptoType: e.target.value,
                        })
                      }
                      helperText="Please select payment coin"
                      variant="outlined"
                      fullWidth
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Add credit
                    </Button>
                  </ListItem>
                </form>
              </Box>
              {amounterr ? (
                <Box display="flex" justifyContent="center" m={2}>
                  <Typography variant="caption" color="error">
                    Deposit amount must be equal or higher than the minimum
                    stake.
                  </Typography>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Wallet;
