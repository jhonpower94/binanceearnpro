import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagnition from "../../../components/pagination";
import {
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";

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

  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(4);
  // get current post
  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = arrayDatas.slice(indexofFirstpage, indexofLastpost);
  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          {currentPost.map((data, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper className={classes.column}>
                <ListItem className={classes.row}>
                  <ListItemText
                    primary={data.name}
                    secondary={`${data.days} investment`}
                  />
                  <img
                    src={require(data.trading
                      ? "../icons/trading.svg"
                      : "../icons/success.svg")}
                  />
                  
                </ListItem>
                <ListItem className={classes.row}>
                  <ListItemText
                    primary="Deposit amount"
                    secondary={`@ ${data.date} ${data.time}`}
                  />
                  <Typography variant="h5">{`$ ${data.deposit_amount}`}</Typography>
                </ListItem>
                <ListItem className={classes.row}>
                  <ListItemText
                    primary={
                      data.trading ? `current trade value` : `Returned amount`
                    }
                    secondary={
                      data.trading
                        ? `Today @ ${new Date().toLocaleTimeString()}`
                        : `@ ${data.date} ${data.time}`
                    }
                  />
                  <Typography variant="h5">
                    {data.trading
                      ? `${currenttrading()}%`
                      : `$ ${data.return_amount}`}
                  </Typography>
                </ListItem>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={12}>
            <Pagnition
              postperpage={postperpage}
              totalpost={arrayDatas.length}
              paginate={paginate}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Investment;
