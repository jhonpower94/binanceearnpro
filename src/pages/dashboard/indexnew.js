import {
  Backdrop,
  Box,
  useMediaQuery,
  useScrollTrigger,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  AccountBalanceWalletSharp,
  AddCircleSharp,
  GetAppSharp,
  HomeSharp,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import { navigate } from "@reach/router";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../App";
import CustomLoader from "../../components/loader";
import firebase, { collectionData, docData, firestore } from "../../config";
import { getVerifiedUsers } from "../../config/verification";
import TranslateWidget from "../../lang/yandextranslatewidget";
import {
  bonusbalance$,
  bonusCollections$,
  deposithistory$,
  locationinfo$,
  mainbalance$,
  myinvestment$,
  notification$,
  totalbonusearned$,
  totaldeposit$,
  totalprofit$,
  totalwithdrawn$,
  withdrawhistory$,
} from "../../redux/action";
import DasboardMenu from "./menu";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tabs-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  rootmobile: {
    display: "block",
  },
  space: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    //  color: blue[800],
  },
  menuButton: {
    marginRight: 0,
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  space: {
    flexGrow: 1,
  },
  main: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  demo2: {
    backgroundColor: theme.palette.primary.main,
  },
  stackicon: {
    height: 38,
    width: 38,
    border: "1px solid #E0E3E7",
    borderRadius: 10,

    backgroundColor: theme.palette.background.default,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function DashboardLayout(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const loading = useSelector((state) => state.loading);
  const { tabs, currentab, setCurrentab, pagetitle } = useContext(AppContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentab);
  const [user, setUser] = useState({
    email: "email@example.com",
    verified: true,
  });

  useEffect(() => {
    //  dispatch(loading$());
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("../account");
      } else {
        // for kyc verification
        getVerifiedUsers(user.email).subscribe((val) => {
          if (val.verified) {
            console.log(val);
            setUser({ email: user.email, verified: true });
          } else {
            console.log("not verified");
            setUser({ email: user.email, verified: false });
          }
        });

        const datas = firestore.doc(`users/${user.uid}`);
        docData(datas, "id").subscribe((val) => {
          dispatch(locationinfo$(val));

          // dispatch(stopload$(false));
        });

        /*

        datas.get().then((data) => {
          console.log(data.data());
          const val = data.data();
          // convert investment plan for dashboard
          const currency = val.currencycode;
          investmentplans.forEach((plan, inex) => {
            converter.convert(plan.lot, "USD", currency).then((data) => {
              plan.lot = Math.floor(data);
              navigate("");
            });
            converter.convert(plan.max, "USD", currency).then((data) => {
              plan.max = Math.floor(data);
              navigate("");
            });
          });
        });

        */

        // total return collection
        const returnedbalance = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .where("complete", "==", true);

        collectionData(returnedbalance, "id").subscribe((data) => {
          console.log(data);

          const returnTotal = data.reduce((prv, cur) => {
            return prv + cur.return_amount;
          }, 0);

          dispatch(
            mainbalance$(returnTotal)
            /*   formatLocaleCurrency(Math.floor(returnTotal), "USD", {
                autoFixed: false,
              }) */
          );
        });

        // totatal deposited
        const allDeposits = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .orderBy("created_at", "desc");
        collectionData(allDeposits, "id").subscribe((data) => {
          const totalDeposit = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);

          const totalPercentage = data.reduce((prv, cur) => {
            const pasint = parseInt(cur.percentage);
            return prv + cur.percentage;
          }, 0);

          console.log(totalPercentage);

          dispatch(myinvestment$(data));

          dispatch(totaldeposit$(totalDeposit));

          if (isNaN(totalPercentage)) {
            const totlProfitx = (totalPercentage / 100) * totalDeposit;
            dispatch(totalprofit$(0));
          } else {
            //total profits
            const totlProfit = (totalPercentage / 100) * totalDeposit;
            dispatch(totalprofit$(totlProfit));
          }
        });

        //total withdrawn
        const Total_withdrawn = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .where("return_amount", "==", 0);
        collectionData(Total_withdrawn, "id").subscribe((data) => {
          const totalwithdrawn = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);

          dispatch(totalwithdrawn$(totalwithdrawn));
        });

        // bonus balance
        const Bonus = firestore
          .doc(`users/${user.uid}`)
          .collection("bonus")
          .orderBy("created_at", "desc");
        collectionData(Bonus, "id").subscribe((data) => {
          // bonus total recievede bonus
          const bonusTotalRecieved = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);
          dispatch(totalbonusearned$(bonusTotalRecieved));

          // main remaining bonus balance
          const bonusCurrentBalance = data.reduce((prv, cur) => {
            return prv + cur.deposit_amount;
          }, 0);

          dispatch(bonusbalance$(Math.floor(bonusCurrentBalance)));

          // bonus collections
          data.forEach((val, index) => {
            dispatch(bonusCollections$(data));
          });
        });

        // notification
        const notifications = firestore
          .doc(`users/${user.uid}`)
          .collection("notification");

        collectionData(notifications, "id").subscribe((data) => {
          dispatch(notification$(data));
        });

        // deposit / withdrawal history
        const allWalletHistory = (transactionType) =>
          firestore
            .collection("transactions")
            .where("userid", "==", user.uid)
            .where("name", "==", transactionType)
            .orderBy("timestamp", "desc");

        collectionData(allWalletHistory("wallet deposit"), "id").subscribe(
          (data) => {
            if (data.length > 0) return dispatch(deposithistory$(data));
          }
        );
        collectionData(allWalletHistory("Wallet withdrawal"), "id").subscribe(
          (data) => {
            if (data.length > 0) return dispatch(withdrawhistory$(data));
          }
        );
      }
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const changeNav = (nav, index) => {
    setCurrentab(0);
    navigate(`/${nav.link}`);
    handleDrawerClose();
  };

  return (
    <div
      className={
        useMediaQuery(useTheme().breakpoints.up("sm"))
          ? classes.root
          : classes.rootmobile
      }
    >
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, classes.stackicon, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <img
              onClick={() => navigate("../dashboard")}
              src={require("../../images/logomobile.svg")}
              height="35"
              style={{ marginLeft: 16 }}
            />

            <span className={classes.space} />
            <TranslateWidget />
            <DasboardMenu />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <span className={classes.space} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            {
              title: currentStrings.Nav.Dashboard,
              link: "dashboard",

              icon: <HomeSharp />,
            },
            {
              title: "Earnpro wallet",
              link: "dashboard/wallet",

              icon: <AccountBalanceWalletSharp />,
            },
            {
              title: currentStrings.Nav.invest,
              link: "dashboard/invest",

              icon: <AddCircleSharp />,
            },
            {
              title: "Portfolio / Bonus",
              link: "dashboard/withdraw",

              icon: <GetAppSharp />,
            },
          ].map((link, index) => (
            <ListItem button key={index} onClick={() => changeNav(link, index)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {props.children}
        <Backdrop className={classes.backdrop} open={loading.loading}>
          <CustomLoader />
        </Backdrop>
      </main>
    </div>
  );
}

/*
  {loading.loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={20}
          >
            <FacebookCircularProgress />
          </Box>
        ) : (
          <>
            {user.verified ? null : (
              <Box p={2}>
                <Alert variant="filled" severity="info">
                  <AlertTitle>Profile verification</AlertTitle>
                  <Typography gutterBottom variant="body2">
                    Activate account full usage access, by verifying your
                    profile, click on verify profile below.
                  </Typography>
                  <Link
                    variant="body1"
                    href={`https://kycverify.firebaseapp.com/kyc?sname=unchainedtrade&user=${user.email}&rdr=web.unchainedtrade.com`}
                    color="inherit"
                  >
                    {"Verify profile"}
                  </Link>
                </Alert>
              </Box>
            )}

            {props.children}
          </>
        )}
        */
