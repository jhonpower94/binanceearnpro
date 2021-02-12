import React, { useContext, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  useScrollTrigger,
  withStyles,
  Box,
  useMediaQuery,
  CircularProgress,
} from "@material-ui/core";
import { red, blue } from "@material-ui/core/colors";
import { navigate } from "@reach/router";

import { AppContext } from "../../App";
import SelectLanguage from "../../components/lang_select";
import DasboardMenu from "./menu";
import { useDispatch, useSelector } from "react-redux";
import firebase, { firestore, collectionData, docData } from "../../config";

import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import {
  bonusbalance$,
  bonusCollections$,
  loading$,
  locationinfo$,
  mainbalance$,
  myinvestment$,
  notification$,
  stopload$,
  totalbonusearned$,
  totaldeposit$,
  totalprofit$,
  totalwithdrawn$,
} from "../../redux/action";
import {
  AccountBalanceWalletSharp,
  AddCircleSharp,
  GetAppSharp,
  HomeSharp,
} from "@material-ui/icons";
import { Helmet } from "react-helmet";
import { investmentplans } from "../../service/plansashboard";
import { Converter } from "easy-currencies";
import { doc } from "rxfire/firestore";

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
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    height: "0.4em",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
      borderTopLeftRadius: "50px",
      borderTopRightRadius: "50px",
    },
  },
}))((props) => (
  <Tabs
    {...props}
    // centered={useMediaQuery(useTheme().breakpoints.up("sm")) ? false : true}
    TabIndicatorProps={{ children: <span /> }}
  />
));

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.getContrastText("#2196f3"),
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: theme.palette.primary.main,
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress(props) {
  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

let converter = new Converter(
  "OpenExchangeRates",
  "b0e02e52f17b4f2a874d46b3deae060a"
);

export default function DashboardLayout(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const loading = useSelector((state) => state.loading);
  const { tabs, currentab, setCurrentab, pagetitle } = useContext(AppContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(currentab);

  useEffect(() => {
  //  dispatch(loading$());
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("../account");
      } else {
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
      }
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentab(newValue);
  };

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
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
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
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">{pagetitle.title}</Typography>
            <span className={classes.space} />
            <SelectLanguage />
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
          <img src={require("../homepage/images/logo.svg")} height="50" />
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
              title: currentStrings.Nav.invest,
              link: "dashboard/invest",

              icon: <AddCircleSharp />,
            },
            {
              title: currentStrings.Nav.withdraw,
              link: "dashboard/withdraw",

              icon: <GetAppSharp />,
            },
            {
              title: currentStrings.Nav.wallet,
              link: "dashboard/wallet",

              icon: <AccountBalanceWalletSharp />,
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
          props.children
        )}
      </main>
    </div>
  );
}

/*
<div className={classes.demo2}>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            {tabs.map((tab, index) => (
              <StyledTab label={tab.title} key={index} {...allyProps(index)} />
            ))}
          </StyledTabs>
        </div>

         <List>
          {[
            {
              title: currentStrings.Nav.investments,
              link: "dashboard/invest",
              tabindex: 0,
            },
            {
              title: currentStrings.Nav.referral_bonus,
              link: "dashboard/invest",
              tabindex: 1,
            },
            {
              title: currentStrings.Nav.account_info,
              link: "dashboard/invest",
              tabindex: 2,
            },
          ].map((link, index) => (
            <ListItem button key={index} onClick={() => changeNav(link, index)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
        </List>
      

        */
