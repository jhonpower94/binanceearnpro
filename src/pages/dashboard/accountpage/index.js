import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../App";
import { useSelector, useDispatch } from "react-redux";
import { selectedmenuItem$ } from "../../../redux/action";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Script from "react-load-script";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
  ListItemAvatar,
  Typography,
  Avatar,
  CardHeader,
  CardContent,
  Fab,
  Box,
  Card,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Pagnition from "../../../components/pagination";
import { navigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  column: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    margin: "10px",
  },
  align: {
    alignItems: "center",
  },
  orange: {
    color: theme.palette.getContrastText("#fafafa"),
    backgroundColor: "#fafafa",
  },
  margintop: {
    marginTop: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    right: theme.spacing(1),
    bottom: "2em",
  },
  height: {
    height: "24em",
  },
  size: {
    fontSize: "x-large",
    color: theme.palette.primary.main,
  },
  avaterbalance: {
    width: "5em",
  },
  avaterbonus: {
    width: "3.8em",
  },
  avateref: {
    width: "2.5em",
  },
  cardheader: {
    background: theme.palette.primary.main,
    color: theme.palette.getContrastText("#ef6c00"),
  },
  wordbreak: {
    wordBreak: "break-word",
  },
}));

function DashboardPage() {
  const classes = useStyles();
  const { userData, user, balance } = useContext(AppContext);
  const dispatch = useDispatch();
  const mainbalance = useSelector((state) => state.balance);
  const referralData = useSelector((state) => state.bonus.bonus);
  const activities = useSelector((state) => state.activities);
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(3);

  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = referralData.slice(indexofFirstpage, indexofLastpost);

  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  const balanceData = [
    {
      title: "Account balance",
      balance: mainbalance.main_balance,
      subheader: "Deposits and earning",
      Avater: require("../icons/balance.svg"),
    },
    {
      title: "Bonus balance",
      balance: mainbalance.bonus_balance,
      subheader: "Awards and referral bonus",
      Avater: require("../icons/bonus.svg"),
    },
  ];

  const profileData = [
    {
      title: "Total profit earned",
      value: activities.totlProfit,
    },
    {
      title: "Total deposited",
      value: activities.totalDeposit,
    },
    {
      title: "Total withdrawn",
      value: activities.totalwithdrawn,
    },
    {
      title: "Total bonus earned",
      value: activities.bonusTotalRecieved,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(selectedmenuItem$(0));
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={5} justify="center">
          <Grid item xs={12} sm={12}>
            <coingecko-coin-price-marquee-widget
              coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
              currency="usd"
              background-color="#ffffff"
              locale="en"
            ></coingecko-coin-price-marquee-widget>
            <coingecko-coin-compare-chart-widget
              coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
              currency="usd"
              locale="en"
            ></coingecko-coin-compare-chart-widget>
            <Script url="https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js" />
            <Script url="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js" />
          </Grid>
        </Grid>
        <Grid container spacing={5} justify="center">
          {balanceData.map((data, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card className={classes.column}>
                <CardHeader
                  title={<Typography variant="h6">{data.title}</Typography>}
                  action={<img src={data.Avater} width="50" />}
                  className={classes.cardheader}
                />

                <div className={classes.row}>
                  <div className={clsx(classes.column, classes.align)}>
                    <Typography variant="h4">{data.balance}</Typography>

                    <ListItemText
                      primary={data.subheader}
                      className={classes.margintop}
                    />
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={7}>
            <Card>
              <ListItem className={classes.cardheader}>
                <ListItemAvatar>
                  <img
                    src={require("../../../images/mobile.svg")}
                    height="50px"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h6">Activities</Typography>}
                />
              </ListItem>
              <List>
                {profileData.map((data, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={data.title} />
                    <ListItemSecondaryAction>
                      <Typography variant="h6">{data.value}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Card>{" "}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card
              className={
                useMediaQuery(useTheme().breakpoints.up("sm"))
                  ? classes.height
                  : null
              }
            >
              <ListItem className={classes.cardheader}>
                <ListItemAvatar>
                  <img
                    src={require("../icons/bonus.svg")}
                    className={classes.avateref}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6">Referral earnings</Typography>
                  }
                />
              </ListItem>
              <CardContent>
                <Pagnition
                  postperpage={postperpage}
                  totalpost={referralData.length}
                  paginate={paginate}
                />
              </CardContent>
              {referralData.length != 0 ? (
                <List dense={true}>
                  {currentPost.map((data, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={data.from}
                        secondary={`@ ${data.date}`}
                      />
                      <Typography variant="h6">
                        {data.deposit_amount}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <CardContent>
                  <Typography align="center" variant="body1">
                    Earn <span className={classes.size}>5%</span> of users
                    deposits if the users is registered with your email as
                    referral ID
                  </Typography>
                </CardContent>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  m={3}
                >
                  <Typography>Referral ID</Typography>
                  <Typography
                    variant="body1"
                    className={classes.wordbreak}
                    align="center"
                  >
                    {`http://${window.location.hostname}:3000/account/register/${user.id}`}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? null : (
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              onClick={() => navigate("invest")}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default DashboardPage;
