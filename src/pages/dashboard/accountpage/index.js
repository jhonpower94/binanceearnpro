import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Pagnition from "../../../components/pagination";

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
  avaterbalance:{
    width: "5em"
  },
  avaterbonus:{
    width: "3.8em"
  },
  avateref:{
    width: "2.5em"
  }
}));

const profileData = [
  {
    title: "Total profit earned",
    value: 5000,
  },
  {
    title: "Total deposited",
    value: 5000,
  },
  {
    title: "Total withdrawn",
    value: 5000,
  },
  {
    title: "Total bonus earned",
    value: 5000,
  },
];

const referralData = [
  {
    user: "jhon snow",
    date: new Date().toLocaleDateString(),
    amount: 30
  },
  {
    user: "jhon snow",
    date: new Date().toLocaleDateString(),
    amount: 30
  },
  {
    user: "jhon snow",
    date: new Date().toLocaleDateString(),
    amount: 30
  },
  {
    user: "jhon snow",
    date: new Date().toLocaleDateString(),
    amount: 30
  }
];

function DashboardPage() {
  const [currentpage, setCurrentpage] = useState(1);
  const [postperpage, setPostperpage] = useState(3);
  const classes = useStyles();

  const indexofLastpost = currentpage * postperpage;
  const indexofFirstpage = indexofLastpost - postperpage;
  const currentPost = referralData.slice(indexofFirstpage, indexofLastpost);

  // change page
  const paginate = (pagenumber) => setCurrentpage(pagenumber);

  const balanceData = [
    {
      title: "Account balance",
      balance: 10000,
      subheader: "Deposits and earning",
      Avater: <img src={require("../icons/balance.svg")} className={classes.avaterbalance} /> ,
    },
    {
      title: "Bonus balance",
      balance: 100,
      subheader: "Awards and referral bonus",
      Avater: <img src={require("../icons/bonus.svg")} className={classes.avaterbonus} />,
    },
  ];

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          {balanceData.map((data, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Paper className={classes.column}>
                <CardHeader title={data.title} action={data.Avater} />
                <div className={classes.row}>
                  <div className={clsx(classes.column, classes.align)}>
                    <Typography variant="h4">$ {data.balance}</Typography>

                    <ListItemText
                      primary={data.subheader}
                      className={classes.margintop}
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12} sm={7}>
            <Paper>
              <ListItem>
                <img
                  src={require("../../../images/mobile.svg")}
                  height="50px"
                />
                <CardHeader title="Activities" />
              </ListItem>
              <List>
                {profileData.map((data, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={data.title} />
                    <ListItemSecondaryAction>
                      <Typography variant="h6">{`$ ${data.value}`}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText primary="Referrals I.D" />
                  <Typography variant="body1">Jhonsnow@gmail.com</Typography>
                </ListItem>
              </List>
            </Paper>{" "}
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper
              className={
                useMediaQuery(useTheme().breakpoints.up("sm"))
                  ? classes.height
                  : null
              }
            >
              <ListItem>
                <ListItemAvatar>
                <img src={require("../icons/star.svg")} className={classes.avateref} />
                </ListItemAvatar>
                <ListItemText primary="Referrals earnings" />
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
                        primary={data.user}
                        secondary={`@ ${data.date}`}
                      />
                      <Typography variant="h6">{`$ ${data.amount}`}</Typography>
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
            </Paper>
          </Grid>
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? null : (
            <Fab color="primary" aria-label="add" className={classes.fab}>
              <AddIcon />
            </Fab>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default DashboardPage;
