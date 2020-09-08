import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagnition from "../../../components/pagination";
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
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { loading$, selectedmenuItem$ } from "../../../redux/action";
import firebase, { firestore } from "../../../config";
import { navigate } from "@reach/router";
import { GetAppSharp } from "@material-ui/icons";
import { ajax } from "rxjs/ajax";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";

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

function WithdrawBonus() {
  const classes = useStyles();
  const userid = JSON.parse(window.localStorage.getItem("userdata")).id;
  const storageData = JSON.parse(window.localStorage.getItem("userdata"));
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.locationinfo.locationinfo);
  const bonus = useSelector((state) => state.bonus.bonus);
  const [withdrawn, setwithdrawn] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(4);
  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = bonus.slice(indexofFirstpage, indexofLastpost);
  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(3));
  }, []);

  const withdraw = (data) => {
    dispatch(loading$());
    console.log(data.id);
    firestore
      .doc(`users/${userid}`)
      .collection("bonus")
      .doc(data.id)
      .update({
        deposit_amount: 0,
        withdrawn: true,
      })
      .then(() => {
        firestore
          .collection("transactions")
          .add({
            type: "Bonus withdrawal",
            action: "withdrawal",
            pending: true,
            return_amount: data.amount,
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email: storageData.email,
            firstname: storageData.firstName,
            lastname: storageData.lastName,
          })
          .then(() => {
            const amountnn = formatLocaleCurrency(
              data.amount,
              "USD",
              {
                autoFixed: false,
              }
            );
            ajax({
              url: "https://hotblockexpressapi.herokuapp.com/mail",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: {
                message: `Hi ${userInfos.firstName} ${userInfos.lastName} <br><br/>
                You have successfully placed a withdrawal request of ${amountnn} to your BTC wallet.<br/><br/>
                Please exercise patience while we process your transaction<br/><br/>
                Thanks. `,
                to: `${userInfos.email}, support@coinspringinvest.net`,
                subject: "New Deposit",
              },
            }).subscribe(() => {
              console.log("message sent");
              dispatch(loading$());
              navigate("../complete");
            });
          });
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader
            title={<Typography variant="h6">Recieved bonus</Typography>}
          />
          <Box display="flex" justifyContent="center" m={1}>
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
                  title={<Typography variant="h5">{data.from}</Typography>}
                  subheader={`${data.description} ${data.date}`}
                  action={
                    <Typography variant="h5">{data.deposit_amount}</Typography>
                  }
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="text"
                    startIcon={<GetAppSharp />}
                    color="primary"
                    disabled={data.withdrawn}
                    onClick={() => withdraw(data)}
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
            totalpost={bonus.length}
            paginate={paginate}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default WithdrawBonus;
