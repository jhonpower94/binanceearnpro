import React, { useEffect, useContext, useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Container,
  Grid,
  TextField,
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
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
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function BtcAddressInput(props) {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    type: "wallet",
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
    if (value.amount > data.deposit_amount) {
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
        const remainingBonus = data.deposit_amount - value.amount;
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
                return_amount: parseInt(value.amount),
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
                    "https://reinvented-natural-catshark.glitch.me/unchainedtrade",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: {
                    message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName} <br><br/>
                    ${currentStrings.emailmessages.address.a} ${value.amount} ${currentStrings.emailmessages.address.b} ${address}.<br/><br/>
                    ${currentStrings.emailmessages.address.c}`,
                    to: `${userInfos.email}, service@unchainedtrader.com`,
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
            return_amount: value.amount,
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: userInfos.email,
            firstname: userInfos.firstName,
            lastname: userInfos.lastName,
            currency: userInfos.currencycode,
          })
          .then(() => {
            const amountnn = formatLocaleCurrency(value.amount, "USD", {
              autoFixed: false,
            });

            const remainingAmount = data.return_amount - value.amount;

            firestore
              .doc(`users/${userInfos.id}`)
              .collection("deposits")
              .doc(data.id)
              .update({
                return_amount: remainingAmount,
                withdrawn: remainingAmount == 0 ? true : false,
              });

            ajax({
              url:
                "https://reinvented-natural-catshark.glitch.me/unchainedtrade",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              ${currentStrings.emailmessages.address.a} ${amountnn} ${currentStrings.emailmessages.address.b} ${address}.<br/><br/>
              ${currentStrings.emailmessages.address.c}
              `,
                to: `${userInfos.email}, service@unchainedtrader.com`,
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

  const walletEmailType = (amount, newbalance, emailtype) => {
    const amountAdded = formatLocaleCurrency(amount, "USD", {
      autoFixed: false,
    });
    const amountnn = formatLocaleCurrency(newbalance, "USD", {
      autoFixed: false,
    });

    ajax({
      url:
        "https://reinvented-natural-catshark.glitch.me/unchainedtrade",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: `${currentStrings.emailmessages.hello} ${userInfos.firstName} ${userInfos.lastName}
       <br><br/>
       you have succesfully added your ${emailtype} balance of <p style="color: #06b956;">${amountAdded}</p> to your account wallet,
       and your current total wallet balance is <p style="color: #06b956;">${amountnn}</p>
       <br/>
       you can now use your wallet balance to reininvest, thank you.
    `,
        to: `${userInfos.email}, service@unchainedtrader.com`,
        subject: currentStrings.emailmessages.address.subject_withdraw,
      },
    }).subscribe(() => {
      dispatch(loading$());
      navigate("wallet");
    });
  };

  const addToWallet = (e) => {
    e.preventDefault();

    if (type === "investment") {
      console.log(data.return_amount);
      dispatch(loading$());
      const new_Balance = userInfos.wallet_balance + data.return_amount;
      firestore
        .doc(`users/${userInfos.id}`)
        .update({
          wallet_balance: new_Balance,
        })
        .then(() => {
          firestore
            .doc(`users/${userInfos.id}`)
            .collection("deposits")
            .doc(data.id)
            .update({
              return_amount: 0,
              withdrawn: true,
            });
          // run email code here
          walletEmailType(data.return_amount, new_Balance, "investment");
        });
    } else {
      console.log(data.deposit_amount);
      dispatch(loading$());
      const new_Balance = userInfos.wallet_balance + data.deposit_amount;
      firestore
        .doc(`users/${userInfos.id}`)
        .update({
          wallet_balance: new_Balance,
        })
        .then(() => {
          firestore
            .doc(`users/${userInfos.id}`)
            .collection("bonus")
            .doc(data.id)
            .update({
              deposit_amount: 0,
              withdrawn: true,
            });
          walletEmailType(data.deposit_amount, new_Balance, "bonus");
        });
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

  const change = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name);
  };

  /*  const changeAdress = (event) => {
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
  }; */

  return (
    <Container maxWidth="sm" className={classes.margintop}>
      <form onSubmit={value.type != "wallet" ? submitForm : addToWallet}>
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select your withdrawal option</FormLabel>
              <RadioGroup
                value={value.type}
                aria-label="gender"
                name="type"
                onChange={change}
              >
                <FormControlLabel
                  value="wallet"
                  control={<StyledRadio />}
                  label="Wallet"
                />
                <FormControlLabel
                  value="account"
                  control={<StyledRadio />}
                  label="Account"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {value.type != "account" ? null : (
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
                  onChange={change}
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
                  onChange={change}
                  helperText={
                    err.status
                      ? err.text
                      : currentStrings.Dashboard.withdraw.helpertext_amount
                  }
                  error={err.status}
                />
              </Grid>
            </Grid>
          )}

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
