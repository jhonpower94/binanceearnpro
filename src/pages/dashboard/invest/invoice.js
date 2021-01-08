import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  loading$,
  loadingpayment$,
  transactionInfo$,
} from "../../../redux/action";
import firebase, { firestore } from "../../../config";
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
  CardActions,
} from "@material-ui/core";
import { client } from "../../../config/services";
import { reactLocalStorage } from "reactjs-localstorage";
import { navigate } from "@reach/router";
import { ajax } from "rxjs/ajax";
import { Rating } from "@material-ui/lab";
import NumberFormat from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";
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

function Invoice() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);

  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const dispatch = useDispatch();
  const { paymentInfo, setPaymentInfo, pagetitle, setPagetitle } = useContext(
    AppContext
  );
  const [selectedValue, setSelectedValue] = React.useState("wallet");
  const [amounterr, setAmountErr] = useState({ status: false, text: "" });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    //  setPaymentInfo({ ...paymentInfo, amount: paymentInfo.block.lot });
    setPagetitle({
      ...pagetitle,
      title: currentStrings.Dashboard.titles.invoice,
    });
    console.log(paymentInfo.blockindex);
  }, []);

  const invoiceData = [
    /*  {
      name: "Deposit Amount",
      value: formatLocaleCurrency(paymentInfo.amount, userInfos.currencycode, {
        autoFixed: false,
      }),
    }, */
    {
      name: currentStrings.Dashboard.invest.invoice.min,
      value: formatLocaleCurrency(
        Math.floor(paymentInfo.block.lot) + 1,
        userInfos.currencycode,
        { autoFixed: false }
      ),
    },
    {
      name: currentStrings.Dashboard.invest.invoice.wallet_balance,
      value: isNaN(userInfos.wallet_balance)
        ? formatLocaleCurrency(0, userInfos.currencycode, {
            autoFixed: false,
          })
        : formatLocaleCurrency(
            userInfos.wallet_balance,
            userInfos.currencycode,
            {
              autoFixed: false,
            }
          ),
    },
    {
      name: currentStrings.Dashboard.invest.invoice.min_profit,
      value: formatLocaleCurrency(
        (paymentInfo.block.min_rate / 100) * paymentInfo.amount,
        userInfos.currencycode,
        {
          autoFixed: false,
        }
      ),
    },
    {
      name: currentStrings.Dashboard.invest.invoice.max_profit,
      value: formatLocaleCurrency(
        (paymentInfo.block.max_rate / 100) * paymentInfo.amount,
        userInfos.currencycode,
        {
          autoFixed: false,
        }
      ),
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
    currency1: userInfos.currencycode,
    currency2: paymentInfo.cryptoType,
    amount: paymentInfo.amount,
    buyer_email: "jhonsnow751@gmail.com",
  };
  const storagedata = reactLocalStorage.getObject("paymentInfo");

  const submitPayment = (e) => {
    e.preventDefault();
    /*
    const removePaymentStorage = async () => {
      await reactLocalStorage.remove("paymentInfo");
    };
    const addToStorage = async (value) => {
      await dispatch(
        transactionInfo$({
          ...value,
          block: paymentInfo.block,
          blockindex: paymentInfo.blockindex,
          amount: paymentInfo.amount,
          cryptoType: paymentInfo.cryptoType,
          active_transaction: false,
        })
      );
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
      
    */
    dispatch(loading$());
    firestore
      .collection("alldeposits")
      .add({
        type: "investment",
        pending: true,
        block_name: paymentInfo.block.name,
        block_title: paymentInfo.block.title,
        rate: parseInt(paymentInfo.block.rate),
        deposit_amount: parseInt(paymentInfo.amount),
        amount: parseInt(paymentInfo.amount),
        userid: userInfos.id,
        email: userInfos.email,
        firstname: userInfos.firstName,
        lastname: userInfos.lastName,
        date: new Date().toLocaleDateString(),
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        duration: paymentInfo.block.duration,
        referrer: userInfos.referrer,
        referrerid: userInfos.referrer ? userInfos.referrerid : "",
      })
      .then(() => {
        const amountnn = formatLocaleCurrency(
          paymentInfo.amount,
          userInfos.currencycode,
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
            message: `New incoming investment request from ${userInfos.firstName} ${userInfos.lastName} has been placed, total deposit amount : ${amountnn}`,
            to: `${userInfos.email}, support@digitalallianceap.net`,
            subject: "investment",
          },
        }).subscribe(() => {
          console.log("message sent");
          dispatch(loading$());
          navigate("payment_wallet");
        });
      });
  };

  const submitpaymentWallet = (e) => {
    e.preventDefault();
    dispatch(loading$());
    const removePaymentStorage = async () => {
      await reactLocalStorage.remove("paymentInfo");
    };
    const addToStorage = async () => {
      await dispatch(
        transactionInfo$({
          block: paymentInfo.block,
          blockindex: paymentInfo.blockindex,
          amount: paymentInfo.amount,
          cryptoType: paymentInfo.cryptoType,
          active_transaction: false,
        })
      );
    };

    dispatch(loading$());

    if (paymentInfo.amount > userInfos.wallet_balance) {
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
        text:
          "Investment amount must be equal or higher than the minimum stake.",
      });
    } else {
      removePaymentStorage().then(() => {
        addToStorage().then(() => {
          firestore
            .doc(`users/${userInfos.id}`)
            .update({
              wallet_balance: userInfos.wallet_balance - paymentInfo.amount,
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
      <CardHeader
        title={paymentInfo.block.name}
        subheader={
          <Rating
            name="read-only"
            value={paymentInfo.blockindex + 3}
            readOnly
          />
        }
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        className={classes.headerbgss}
      />
      <List>
        {invoiceData.map((data, index) => (
          <ListItem key={index}>
            <ListItemText primary={data.name} />
            <Typography variant="body1">{data.value}</Typography>
          </ListItem>
        ))}
        <form className={classes.margintop} onSubmit={submitpaymentWallet}>
          <ListItem>
            <TextField
              size="small"
              fullWidth
              id="outlined-number"
              label={currentStrings.Dashboard.invest.invoice.amount}
              name="amount"
              defaultValue={paymentInfo.amount}
              variant="outlined"
              onChange={(e) => {
                setPaymentInfo({
                  ...paymentInfo,
                  amount: e.target.value,
                });
              }}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              helperText={
                amounterr.status
                  ? amounterr.text
                  : currentStrings.Dashboard.invest.invoice.helpertext
              }
              error={amounterr.status ? true : false}
            />
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

          <CardActions>
            <Button type="submit" variant="contained" fullWidth color="primary">
              {currentStrings.Dashboard.invest.invoice.action}
            </Button>
          </CardActions>
        </form>
      </List>
    </Container>
  );
}

export default Invoice;
