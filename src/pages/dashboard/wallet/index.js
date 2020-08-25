import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useDispatch } from "react-redux";
import { loading$ } from "../../../redux/action";
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
    background: "#1835c0",
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

const defaultCurrency = JSON.parse(window.localStorage.getItem("country"))
  .currencycode;

function Wallet() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { paymentInfo, setPaymentInfo, user } = useContext(AppContext);
  const [minimum_deposit, setMinimum_deposit] = useState();
  const [amounterr, setAmountErr] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    converter.convert(50, "USD", defaultCurrency).then((vl) => {
      setPaymentInfo({ ...paymentInfo, amount: vl });
      setMinimum_deposit(vl);
    });
  }, []);

  const CoinpaymentsCreateTransactionOpts = {
    currency1: "USD",
    currency2: paymentInfo.cryptoType,
    amount: 1,
    buyer_email: "jhonsnow751@gmail.com",
  };

  const storagedata = reactLocalStorage.getObject("paymentInfo");

  const addcredit = (e) => {
    e.preventDefault();

    const removePaymentStorage = async () => {
      await reactLocalStorage.remove("paymentInfo");
    };

    const addToStorage = async (value) => {
      await reactLocalStorage.setObject("paymentInfo", {
        ...storagedata,
        txn_info: value,
        amount: paymentInfo.amount,
        cryptoType: paymentInfo.cryptoType,
        active_transaction: false,
      });
    };
    dispatch(loading$());
    if (paymentInfo.amount >= minimum_deposit) {
      client
        .createTransaction(CoinpaymentsCreateTransactionOpts)
        .then((val) => {
          removePaymentStorage().then(() => {
            addToStorage(val).then(() => {
              dispatch(loading$());
              navigate("payment_wallet");
            });
          });
        })
        .catch(() => {
          dispatch(loading$());
          console.log("network error");
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
          <Paper>
            <CardHeader title="My wallet" className={classes.bgheader} />
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h2">
                  {formatLocaleCurrency(user.wallet_balance, defaultCurrency, {
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
                  {formatLocaleCurrency(minimum_deposit, defaultCurrency, {
                    autoFixed: false,
                  })}
                </Typography>
              </ListItem>
            </CardContent>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
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
                        value={Math.floor(paymentInfo.amount) + 1}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            amount: e.target.value,
                          })
                        }
                        startAdornment={
                          <InputAdornment position="start">
                            {defaultCurrency}
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
                      value="LTCT"
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Wallet;
