import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Box, Grid } from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import { Converter } from "easy-currencies";
import CopyInput from "./copyinput";
import { Alert } from "@material-ui/lab";
import { addresses } from "../config";

var QRCode = require("qrcode.react");

let converter = new Converter(
  "OpenExchangeRates",
  "fb74edb0a937e39c966d"
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

  const currentStrings = useSelector((state) => state.language);
  const [newanount, setNewamount] = useState(0);
  const { paymentInfo } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(paymentInfo.cryptoType);
    converterxx
      .convert("USD", paymentInfo.cryptoType, paymentInfo.amount)
      .then((data) => setNewamount(data));
  }, []);

  return (
    <Container maxWidth="md" className={classes.margintop}>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={12}>
          <Box display="flex" justifyContent="center">
            <QRCode
              value={addresses(paymentInfo.cryptoType)}
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
            value={addresses(paymentInfo.cryptoType)}
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
