import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagnition from "../../../components/pagination";
import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import firebase, { firestore } from "../../../config";
import {
  ListItem,
  ListItemText,
  Typography,
  Card,
  Button,
  List,
  ListItemAvatar,
  ListItemSecondaryAction,
  CardHeader,
  Box,
  Divider,
  Link,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { navigate } from "@reach/router";
import { GetAppSharp, FiberManualRecordSharp } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { ajax } from "rxjs/ajax";
const { Converter } = require("easy-currencies");

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  mgright: {
    marginRight: theme.spacing(1),
  },
  space: {
    flexGrow: 1,
  },
  bgheader: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#000000"),
  },
}));

const arrayDatas = [
  {
    name: "SHB & HZX",
    tradeprefix: "shb",
    days: "3 Day",
    deposit_amount: 100,
    return_amount: 115,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    trading: true,
    withdrawn: true,
    status: "Trading",
  },
  {
    name: "TYU & XYT",
    tradeprefix: "TYU",
    days: "7 Days",
    deposit_amount: 1000,
    return_amount: 15000,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    trading: false,
    withdrawn: false,
    profit: 10,
    status: "Complete",
  },
];

const currenttrading = (tradeprefix) => {
  return 15;
};

function Investment() {
  const classes = useStyles();
  const storageData = JSON.parse(window.localStorage.getItem("userdata"));
  const defaultCurrency = JSON.parse(window.localStorage.getItem("country"))
    .currencycode;
  const investments = useSelector((state) => state.investment.trades);
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const currentUserId = userInfos.id;
  const dispatch = useDispatch();
  const [withdrawn, setwithdrawn] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(4);
  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = investments.slice(indexofFirstpage, indexofLastpost);
  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(2));
    converter.convert("500", "USD", "EUR").then((v) => console.log(v));
  }, []);

  const withdraw = (data) => {
    console.log(data.id);

    firestore
      .collection("transactions")
      .add({
        type: "Plan withdrawal",
        action: "withdrawal",
        pending: true,
        name: data.block_name,
        return_amount: data.return_amount,
        date: new Date().toLocaleDateString(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: userInfos.email,
        firstname: userInfos.firstName,
        lastname: userInfos.lastName,
      })
      .then(() => {
        const amountnn = formatLocaleCurrency(
          data.return_amount,
          "USD",
          {
            autoFixed: false,
          }
        );
        firestore
          .doc(`users/${currentUserId}`)
          .collection("deposits")
          .doc(data.id)
          .update({
            return_amount: 0,
            withdrawn: true,
          });

          ajax({
            url: "https://coinspringinvest.herokuapp.com/mail",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {
              message: `Hi ${userInfos.firstName} ${userInfos.lastName} <br><br/>
              You have successfully placed a withdrawal request of ${amountnn} to your BTC wallet.<br/><br/>
              Please exercise patience while we process your transaction<br/><br/>
              Thanks. 
              `,
              to: `${userInfos.email}, support@coinspringinvest.net`,
              subject: "Withdrawal"
            },
          }).subscribe(() => console.log("user message sent"));

      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader
            title={<Typography variant="h6">My investments</Typography>}
          />
          <Box display="flex" justifyContent="center" m={1}>
            {!userInfos.btcaddress ? (
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                You have not set your BTC withdrawal address —{" "}
                <Link component="button" onClick={()=>navigate("profile")}>
                  Add BTC address here
                </Link>
              </Alert>
            ) : null}
            {withdrawn ? (
              <Typography variant="caption" color="error">
                sorry cannot withdraw 0.00 amount
              </Typography>
            ) : null}
          </Box>
          <List>
            {currentPost.map((data, index) => (
              <div key={index}>
                <CardHeader
                  title={
                    <Typography variant="h5">{data.block_name}</Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2">{data.date}</Typography>
                  }
                  avatar={
                    data.complete ? (
                      <FiberManualRecordSharp color="primary" />
                    ) : (
                      <FiberManualRecordSharp color="disabled" />
                    )
                  }
                  action={
                    !data.return_amount ? (
                      <Typography variant="h5">
                        {formatLocaleCurrency(data.deposit_amount, "USD", {
                          autoFixed: false,
                        })}
                      </Typography>
                    ) : (
                      <Typography variant="h5">
                        {formatLocaleCurrency(data.return_amount, "USD", {
                          autoFixed: false,
                        })}
                      </Typography>
                    )
                  }
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="text"
                    startIcon={<GetAppSharp />}
                    color="primary"
                    onClick={() => withdraw(data)}
                    disabled={!data.complete || data.withdrawn}
                  >
                    Withdraw
                  </Button>
                </Box>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </Card>
        <Box m={2}>
          <Pagnition
            postperpage={postperpage}
            totalpost={investments.length}
            paginate={paginate}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Investment;
