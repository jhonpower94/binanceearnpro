import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Box, Grid } from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import { Converter } from "easy-currencies";
import CopyInput from "./copyinput";
import { Alert } from "@material-ui/lab";

var QRCode = require("qrcode.react");

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

let CurrencyConverter = require("@y2nk4/currency-converter");
let converterxx = new CurrencyConverter("b994e84c139607702789");

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(4),
  },
  headerbg: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#ef6c00"),
  },
  italic: {
    fontStyle: "italic",
  },
  Showheading: {
    fontSize: "x-large",
    fontWeight: "bold",
  },
  avater: {
    background: "#ffffff",
  },
  wordbreak: {
    wordBreak: "break-word",
  },
}));

const storagedata = reactLocalStorage.getObject("paymentInfo");

function Payment() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const txn_info = useSelector((state) => state.trxinfo);
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [newanount, setNewamount] = useState(0);
  const [trx_info, setTrx_info] = React.useState({});
  const { paymentInfo, userData, setPaymentInfo } = useContext(AppContext);

  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  let paymenyArrays = [
    {
      name: "Amount to pay",
      value: trx_info.amountf,
    },
    {
      name: "Recieved amount",
      value: trx_info.receivedf,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    converterxx
      .convert("NGN", "BTC", paymentInfo.amount)
      .then((data) => setNewamount(data));
    /* converter.convert(paymentInfo.amount, "USD", "BTC").then((data) => {
      setNewamount(data);
    }); */

    /*
    console.log(JSON.parse(window.localStorage.getItem("paymentInfo")));
    setPaymentInfo({
      ...paymentInfo,
      ...JSON.parse(window.localStorage.getItem("paymentInfo")),
    });

    // check transaction
    const checkTx = repeat()
      .do(() => {
        client
          .getTx({
            txid: txn_info.txn_id,
            full: 1,
          })
          .then((success) => {
            setTrx_info({ ...trx_info, ...success });
            if (success.status == 1) {
              const startLoadpayment = async () => {
                await dispatch(loadingpayment$());
              };
              stopChectx().then(() => {
                startLoadpayment().then(() => navigate("success"));
              });
            } else if (success.status < 0) {
              stopChectx().then(() => {
                console.log("transaction timeout");
                navigate("invest");
              });
            } else {
              console.log(success.status);
            }
          });
      })
      .every(30000);

    const stopChectx = async () => {
      await checkTx.cancel();
    };

    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }

    auth.onAuthStateChanged((user) => {
      setUserInfo({ ...userInfo, name: user.displayName, id: user.uid });
    });

    console.log(storagedata);
    console.log(currentUserId);
    
    */

    // check transactions status
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Container maxWidth="md" className={classes.margintop}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="center">
            <QRCode
              value={`1NKawsJ1AsZ8jeMcJvA3kigPZU6fuFU3UX`}
              renderAs="svg"
              size={200}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Alert variant="outlined" severity="info">
            {`${currentStrings.Dashboard.payment.send} ${paymentInfo.cryptoType} ${currentStrings.Dashboard.payment.send_}`}
          </Alert>
        </Grid>

        <Grid item xs={12} sm={5}>
          <CopyInput
            name={`${paymentInfo.cryptoType} amount`}
            value={newanount}
            id="outlined-adornment-amount"
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <CopyInput
            name={`${paymentInfo.cryptoType} address`}
            value={`1NKawsJ1AsZ8jeMcJvA3kigPZU6fuFU3UX`}
            id="outlined-adornment-crypto"
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Alert variant="filled" severity="warning">
            {currentStrings.Dashboard.payment.info}
          </Alert>
        </Grid>
      </Grid>
    </Container>
  );
}

/* 
<Divider variant="middle" />

        <CardContent>
          {paymenyArrays.map((val, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${val.name} :`} />
              <Typography variant="body1" className={classes.wordBreak}>
                {val.value}
              </Typography>
            </ListItem>
          ))}

          <ListItem>
            <ListItemText primary="Status :" />
            <Typography variant="body1" color="textPrimary">
              Waiting payment...
            </Typography>
          </ListItem>
        </CardContent>
*/

export default Payment;
