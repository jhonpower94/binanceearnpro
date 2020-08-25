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
import { loading$ } from "../../../redux/action";
import { firestore } from "../../../config";
import { navigate } from "@reach/router";

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

const userid = JSON.parse(window.localStorage.getItem("userdata")).id;

function WithdrawBonus() {
  const classes = useStyles();
  const dispatch = useDispatch();
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

  useEffect(() => {}, []);

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
        dispatch(loading$());
        navigate("../complete");
      });
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader title="Bonus" className={classes.bgheader} />
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
                  subheader={data.date}
                  action={
                    <Typography variant="h5">{data.deposit_amount}</Typography>
                  }
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
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
            totalpost={arrayDatas.length}
            paginate={paginate}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default WithdrawBonus;
