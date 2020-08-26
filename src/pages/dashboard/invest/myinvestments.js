import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagnition from "../../../components/pagination";
import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
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
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
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

function Investment() {
  const classes = useStyles();
  const defaultCurrency = JSON.parse(window.localStorage.getItem("country"))
    .currencycode;
  const investments = useSelector((state) => state.investment.trades);
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
  }, []);

  const withdraw = (data) => {
    console.log(data.id);
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Card variant="outlined">
          <CardHeader title="My investments" className={classes.bgheader} />
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
                  title={
                    <Typography variant="h5">{data.block_name}</Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2">{data.date}</Typography>
                  }
                  avatar={
                    data.complete ? (
                      <img
                        src={require("../../../images/investdot.svg")}
                        height="30"
                      />
                    ) : (
                      <img
                        src={require("../../../images/signaldot.svg")}
                        height="30"
                      />
                    )
                  }
                  action={
                    !data.return_amount ? (
                      <Typography variant="h5">
                        {formatLocaleCurrency(
                          data.deposit_amount,
                          defaultCurrency,
                          {
                            autoFixed: false,
                          }
                        )}
                      </Typography>
                    ) : (
                      <Typography variant="h5">
                        {formatLocaleCurrency(
                          data.return_amount,
                          defaultCurrency,
                          { autoFixed: false }
                        )}
                      </Typography>
                    )
                  }
                />

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
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
            totalpost={arrayDatas.length}
            paginate={paginate}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Investment;
