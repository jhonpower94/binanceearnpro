import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useDispatch } from "react-redux";
import { loading$, loadingpayment$ } from "../../../redux/action";
import { firestore } from "../../../config";
import {
  makeStyles,
  Container,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
  MenuItem,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { client } from "../../../config/services";
import { reactLocalStorage } from "reactjs-localstorage";
import { navigate } from "@reach/router";
var formatLocaleCurrency = require("country-currency-map").formatLocaleCurrency;

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(2),
  },
  headerbg: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#ef6c00"),
  },
}));


function Invoice() {
  const classes = useStyles();
  const defaultCurrency = JSON.parse(window.localStorage.getItem("country"))
  .currencycode;
const currentUserId = JSON.parse(window.localStorage.getItem("userdata")).id;

  const dispatch = useDispatch();
  const { paymentInfo, setPaymentInfo, user, setUser } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = React.useState("wallet");
  const [amounterr, setAmountErr] = useState({ status: false, text: "" });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setPaymentInfo({ ...paymentInfo, amount: paymentInfo.block.lot });
    console.log(defaultCurrency);
  }, []);

  const invoiceData = [
    {
      name: "Trade Plan",
      value: paymentInfo.block.name,
    },
    {
      name: "Deposit Amount",
      value: formatLocaleCurrency(paymentInfo.amount, "USD", {
        autoFixed: false,
      }),
    },
    {
      name: "Minimun Stake",
      value: formatLocaleCurrency(
        Math.floor(paymentInfo.block.lot) + 1,
        "USD",
        { autoFixed: false }
      ),
    },
    {
      name: "Return Rate",
      value: `${paymentInfo.block.rate} %`,
    },
    {
      name:
        selectedValue === "wallet" ? "Remaining Balance" : "Payment Currency",
      value:
        selectedValue === "wallet"
          ? formatLocaleCurrency(user.wallet_balance, "USD", {
              autoFixed: false,
            })
          : paymentInfo.cryptoType,
    },
  ];
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

  const CoinpaymentsCreateTransactionOpts = {
    currency1: "USD",
    currency2: paymentInfo.cryptoType,
    amount: 1,
    buyer_email: "jhonsnow751@gmail.com",
  };
  const storagedata = reactLocalStorage.getObject("paymentInfo");

  const submitPayment = (e) => {
    e.preventDefault();
    const removePaymentStorage = async () => {
      await reactLocalStorage.remove("paymentInfo");
    };
    const addToStorage = async (value) => {
      await reactLocalStorage.setObject("paymentInfo", {
        ...storagedata,
        txn_info: value,
        block: paymentInfo.block,
        blockindex: paymentInfo.blockindex,
        amount: paymentInfo.amount,
        cryptoType: paymentInfo.cryptoType,
        active_transaction: false,
      });
    };
    dispatch(loading$());
    if (paymentInfo.amount >= paymentInfo.block.lot) {
      client
        .createTransaction(CoinpaymentsCreateTransactionOpts)
        .then((val) => {
          removePaymentStorage().then(() => {
            addToStorage(val).then(() => {
              dispatch(loading$());
              navigate("payment");
            });
          });
        })
        .catch(() => {
          dispatch(loading$());
          console.log("network error");
        });
    } else {
      setAmountErr({
        ...amounterr,
        status: false,
        text: "Deposit amount must be equal or higher than the minimum stake.",
      });
      dispatch(loading$());
    }
  };

  const submitpaymentWallet = (e) => {
    e.preventDefault();
    dispatch(loading$());
    const removePaymentStorage = async () => {
      await reactLocalStorage.remove("paymentInfo");
    };
    const addToStorage = async () => {
      await reactLocalStorage.setObject("paymentInfo", {
        ...storagedata,
        block: paymentInfo.block,
        blockindex: paymentInfo.blockindex,
        amount: paymentInfo.amount,
        cryptoType: paymentInfo.cryptoType,
        active_transaction: false,
      });
    };

    dispatch(loading$());

    if (paymentInfo.amount > user.wallet_balance) {
      setAmountErr({
        ...amounterr,
        status: true,
        text: "Insufficient Wallet balance",
      });
      console.log("true");
    } else if (paymentInfo.amount < paymentInfo.block.lot) {
      setAmountErr({
        ...amounterr,
        status: true,
        text: "Deposit amount must be equal or higher than the minimum stake.",
      });
    } else {
      removePaymentStorage().then(() => {
        addToStorage().then(() => {
          firestore
            .doc(`users/${currentUserId}`)
            .update({
              wallet_balance: user.wallet_balance - paymentInfo.amount,
            })
            .then(() => {
              dispatch(loadingpayment$());

              navigate("success");
            });
        });
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center">
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose payment method</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="crypto"
              control={<Radio color="primary" />}
              label="Bitcoin"
              labelPlacement="start"
              checked={selectedValue === "crypto"}
              onChange={handleChange}
            />
            <FormControlLabel
              value="wallet"
              control={<Radio color="primary" />}
              label="E-Wallet"
              labelPlacement="start"
              checked={selectedValue === "wallet"}
              onChange={handleChange}
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Card variant="outlined">
        <CardHeader
          title={paymentInfo.block.name}
          className={classes.headerbg}
          action="payment"
        />
        <List>
          {invoiceData.map((data, index) => (
            <ListItem key={index}>
              <ListItemText primary={data.name} />
              <Typography variant="body1">{data.value}</Typography>
            </ListItem>
          ))}
          <form
            className={classes.margintop}
            onSubmit={
              selectedValue === "wallet" ? submitpaymentWallet : submitPayment
            }
          >
            <ListItem>
              <ListItemText primary="Change amount" />
              <FormControl
                className={classes.margin}
                variant="outlined"
                size="small"
                required
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={paymentInfo.amount}
                  onChange={(e) => {
                    setPaymentInfo({
                      ...paymentInfo,
                      amount: e.target.value,
                    });
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      USD
                    </InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </ListItem>
            {selectedValue === "wallet" ? null : (
              <ListItem>
                <ListItemText primary="Change currency" />
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
                  helperText="Please select your currency"
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
            )}

            {amounterr.status ? (
              <Box display="flex" justifyContent="center" m={2}>
                <Typography variant="caption" color="error">
                  {amounterr.text}
                </Typography>
              </Box>
            ) : null}

            <ListItem>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Proceed to payment
              </Button>
            </ListItem>
          </form>
        </List>
      </Card>
    </Container>
  );
}

export default Invoice;
