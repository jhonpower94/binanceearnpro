import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import { ImportExportRounded } from "@material-ui/icons";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { ajax } from "rxjs/ajax";
import { SnackbarWallet } from "../../../components/snackbar";
import firebase, { firestore } from "../../../config";
import { loading$, selectedmenuItem$ } from "../../../redux/action";
import TransactionHistory from "../wallet/history";

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    background: theme.palette.text.primary,
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
  const withdrawthistory = useSelector((state) => state.withdrawhistory);
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

  const [open, setOpen] = React.useState(false);

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
            url: "http://binanceearnpro.online/sendmail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `${currentStrings.emailmessages.hello} ${
                userInfos.firstName
              } ${userInfos.lastName} <br/>
              ${currentStrings.emailmessages.withdraw.a} ${amountnn} ${
                currentStrings.emailmessages.withdraw.b
              } <br/>
              ${value.address}.
              `,
              to: `${userInfos.email}, support@binanceearnpro.online`,
              subject: currentStrings.emailmessages.withdraw.subject,
            },
          }).subscribe(() => {
            dispatch(loading$());
            console.log("user message sent");
          // for snackbar
          setOpen(true);
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
    <>
    <Container maxWidth="md">
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={12}>
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar variant="rounded" className={classes.avatar}>
                  <ImportExportRounded />
                </Avatar>
              }
              title={
                <Typography variant="h6">
                  {isNaN(userInfos.wallet_balance)
                    ? formatLocaleCurrency(0, userInfos.currencycode, {
                        autoFixed: false,
                      })
                    : formatLocaleCurrency(
                        userInfos.wallet_balance,
                        userInfos.currencycode,
                        {
                          autoFixed: false,
                        }
                      )}
                </Typography>
              }
              subheader={currentStrings.Dashboard.withdraw.wallet_balance}
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
        <Grid item xs={12} sm={12}>
          <TransactionHistory
            type={"Withdrawal history"}
            data={withdrawthistory}
            currencycode={userInfos.currencycode}
          />
        </Grid>
      </Grid>
    </Container>
    <SnackbarWallet open={open} setOpen={setOpen} type="Wallet" />
  
    </>
  );
}

export default Withdrawform;
