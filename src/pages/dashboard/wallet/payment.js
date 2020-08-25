import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { loading$, loadingpayment$ } from "../../../redux/action";
import { auth, firestore, docData } from "../../../config";
import {
  makeStyles,
  Container,
  ListItem,
  ListItemText,
  Card,
  Box,
  CardHeader,
  Typography,
  CardContent,
  Divider,
  CircularProgress,
  Avatar,
  Button,
} from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import repeat from "repeat";
import { client } from "../../../config/services";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { navigate } from "@reach/router";
import Countdown from "react-countdown";
import { async } from "rxjs/internal/scheduler/async";
var QRCode = require("qrcode.react");

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(1),
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

function Wallet() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.locationinfo.locationinfo.id
  );
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [userInfo, setUserInfo] = useState({
    name: "",
    id: "",
  });
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
    {
      name: "Reamaining",
      value: trx_info.amount - trx_info.received,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(JSON.parse(window.localStorage.getItem("paymentInfo")));
    console.log(
      JSON.parse(window.localStorage.getItem("userdata")).wallet_balance
    );

    setPaymentInfo({
      ...paymentInfo,
      ...JSON.parse(window.localStorage.getItem("paymentInfo")),
    });

    // check transaction
    const checkTx = repeat()
      .do(() => {
        client
          .getTx({
            txid: JSON.parse(window.localStorage.getItem("paymentInfo"))
              .txn_info.txn_id,
            full: 1,
          })
          .then((success) => {
            setTrx_info({ ...trx_info, ...success });
            if (success.status == 1) {
              const startLoadpayment = async () => {
                await dispatch(loadingpayment$());
              };
              stopChectx().then(() => {
                startLoadpayment().then(() => navigate("credit_success"));
              });
            } else if (success.status < 0) {
              stopChectx().then(() => {
                console.log("transaction timeout");
                navigate("wallet");
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
    <Container maxWidth="sm">
      <Card variant="outlined">
        <div className={classes.headerbg}>
          <CardHeader
            avatar="&#44444;"
            title={
              <Typography variant="h4" className={classes.italic}>
                {storagedata.cryptoType}
              </Typography>
            }
            action={
              <PulseLoader
                css={override}
                size={15}
                color={"#ffffff"}
                loading={true}
              />
            }
          />
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box m={2}>
              <Card variant="outlined">
                <CardContent>
                  <QRCode
                    value={`${trx_info.payment_address}`}
                    renderAs="svg"
                    size={150}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </div>
        <div>
          <Box display="flex" flexDirection="column" alignItems="center" m={3}>
            <Typography variant="body1" align="center">
              Send{" "}
              <span className={classes.Showheading}>
                {`${trx_info.amountf} ${trx_info.coin}`}{" "}
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
              {trx_info.payment_address}
            </Typography>

            <CopyToClipboard
              text={trx_info.payment_address}
              onCopy={handleClick("Address copied")}
            >
              <Typography variant="caption" display="block" gutterBottom>
                Copy
              </Typography>
            </CopyToClipboard>
          </Box>
        </div>
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
