import { css } from "@emotion/core";
import {
  Box, Button, Card, CardContent, CardHeader, Container, Divider, makeStyles, Typography
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Converter } from "easy-currencies";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../../App";
import { auth } from "../../../config";
var QRCode = require("qrcode.react");

let converter = new Converter(
  "OpenExchangeRates",
  "236dd075cd5245eea8b196f1dd855fff"
);

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

const storagedata = window.localStorage.getItem("paymentInfo");

function Wallet() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.locationinfo.locationinfo.id
  );
  const txn_info = useSelector((state) => state.trxinfo);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
  });
  const [trx_info, setTrx_info] = React.useState({});
  const [newanount, setNewamount] = useState(0);
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
    {
      name: "Reamaining",
      value: trx_info.amount - trx_info.received,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    converter.convert(paymentInfo.amount, "USD", "BTC").then((data) => {
      setNewamount(data);
    });

    /*
    console.log(JSON.parse(window.localStorage.getItem("paymentInfo")));

    setPaymentInfo({
      ...paymentInfo,
      ...JSON.parse(window.localStorage.getItem("paymentInfo")),
    });

    client
      .getTx({
        txid: txn_info.txn_id,
        full: 1,
      })
      .then((success) => {
        setTrx_info({ ...trx_info, ...success });
      });

    // check transaction
      const checkTx = repeat()
      .do(() => {
      
      })
      .every(30000);

    const stopChectx = async () => {
      await checkTx.cancel();
    };

    */

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

    console.log(paymentInfo);
    console.log(currentUserId);

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
    <Container maxWidth="sm" className={classes.margintop}>
      <Card variant="outlined">
        <CardHeader
          avatar="&#44444;"
          title={
            <Typography variant="h4" className={classes.italic}>
              {paymentInfo.cryptoType}
            </Typography>
          }
        />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box m={2}>
            <Card variant="outlined">
              <CardContent>
                <QRCode
                  value={paymentInfo.cryptoType}
                  renderAs="svg"
                  size={150}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        <div>
          <Box display="flex" flexDirection="column" alignItems="center" m={3}>
            <Typography variant="body1" align="center">
              Send{" "}
              <span className={classes.Showheading}>
                {`${newanount} ${paymentInfo.cryptoType}`}{" "}
              </span>{" "}
              to address
            </Typography>
            <span className={classes.margintop} />
            <Typography
              variant="h6"
              align="center"
              color="textPrimary"
              display="block"
              className={classes.wordbreak}
            >
              {paymentInfo.cryptoType}
            </Typography>
          </Box>
        </div>
        <Divider variant="middle" />

        <CardContent>
          <Typography variant="body2" align="center">
            once payment is done send notification to live support or email
            support @ service@binanceearnpro.online to notify us of successful deposit
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

export default Wallet;
