import React, { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  loading$,
  totalprofit$,
  totaldeposit$,
  totalwithdrawn$,
  totalbonusearned$,
  bonusCollections$,
  mainbalance$,
  bonusbalance$,
  myinvestment$,
  notification$,
  locationinfo$,
} from "../../redux/action";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import SelectLanguage from "../../components/lang_select";
import DasboardMenu from "./menu";
import Fade from "@material-ui/core/Fade";
import Nightmode from "../../components/Darkmode";
import { navigate } from "@reach/router";
import {
  ExpandMoreSharp,
  AddShoppingCartRounded,
  AccountBalance,
  MonetizationOnSharp,
  BusinessCenterSharp,
  GetAppSharp,
  AccountBalanceWallet,
  LiveHelp,
} from "@material-ui/icons";
import { ListItemAvatar, Box, Typography } from "@material-ui/core";
import firebase, {
  loggedIn$,
  firestore,
  docData,
  collectionData,
} from "../../config";
import { reactLocalStorage } from "reactjs-localstorage";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
import ReactCountryFlag from "react-country-flag";
import { blocks } from "../../service/tradeblocks";
import { Converter } from "easy-currencies";
import getSymbolFromCurrency from "currency-symbol-map";
var getCountry = require("country-currency-map").getCountry;
var cc = require("currency-codes");
var formatLocaleCurrency = require("country-currency-map").formatLocaleCurrency;
const lookup = require("country-code-lookup");

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Roboto",
  },
  rootblock: {
    display: "block",
    fontFamily: "Roboto",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    margin: theme.spacing(1),
  },
  navtext: {
    color: deepOrange[500],
  },
  navtextS: {
    color: deepOrange[500],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  displaynone: {
    display: "none",
  },
  display: {
    display: "block",
  },
  avater: {
    width: "2.5em",
  },
  spacing: {
    flexGrow: 1,
  },
}));

let converter = new Converter(
  "OpenExchangeRates",
  "67eb8de24a554b9499d1d1bf919c93a3"
);

function DashboardLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const {
    userData,
    balance,
    user,
    setUser,
    setUserData,
    setBalance,
  } = useContext(AppContext);
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const loading = useSelector((state) => state.loading);
  const select = useSelector((state) => state.selectetedmenu.number);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selecteditem, setSelecteditem] = React.useState(select);
  const [selecteditemSub, setSelecteditemSub] = React.useState(null);
  const [selectedSub, setSelectedSub] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [values, setValues] = React.useState({
    currencyCode: "",
    countrycodeIos2: "",
    currencySymbol: "",
  });

  const [openTransMenu, setOpenpenTransMenu] = React.useState(false);
  const [submenu, setSubmenu] = React.useState({
    withdraw: false,
    settings: false,
  });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("../account");
      } else {
        if (user.emailVerified) {
          const datas = firestore.doc(`users/${user.uid}`);
          docData(datas, "id").subscribe((val) => {
            reactLocalStorage.setObject("userdata", val); // for collecting user id on transaction
            if (isNaN(val.wallet_balance)) {
              setUser({ ...user, wallet_balance: 0 });
            } else {
              setUser({ ...user, ...val });
            }

            const currencyandBalance = async () => {
              await reactLocalStorage.setObject("country", {
                country: val.country,
              });

              await dispatch(locationinfo$(val));
            };

            currencyandBalance().then(() => {
              const country = JSON.parse(localStorage.getItem("country"))
                .country;
              console.log(JSON.parse(localStorage.getItem("country")).country);
              const newCurcode = getCountry(country).currency; // currency code
              const newCursymbol = getSymbolFromCurrency(newCurcode); // currency code

              blocks.forEach((vl, index) => {
                converter
                  .convert(vl.lot, "USD", newCurcode)
                  .then((val) => {
                    vl.lot = val;
                    console.log(val);
                  })
                  .then(() => navigate(""))
                  .catch((err) => console.log(err));
              });

              setValues({
                ...values,
                currencyCode: newCurcode,
                countrycodeIos2: lookup.byCountry(country).iso2,
              });

              // add currency code to storage
              reactLocalStorage.setObject("country", {
                ...reactLocalStorage.getObject("country"),
                currencycode: newCurcode,
              });

              setUserData({
                ...userData,
                currencyInfo: {
                  countrycode: newCurcode,
                  currencysymbol: newCursymbol,
                },
              });
            });
          });
        } else {
          navigate("../account/verifyemail");
        }

        // total return collection
        const returnedbalance = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .where("complete", "==", true);

        collectionData(returnedbalance, "id").subscribe((data) => {
          console.log(data);
          const country = JSON.parse(localStorage.getItem("country")).country;
          const newCurcode = getCountry(country).currency; // currency code

          const returnTotal = data.reduce((prv, cur) => {
            return prv + cur.return_amount;
          }, 0);

          dispatch(
            mainbalance$(
              formatLocaleCurrency(Math.floor(returnTotal), newCurcode, {
                autoFixed: false,
              })
            )
          );
        });

        // totatal deposited
        const allDeposits = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .orderBy("created_at", "desc");
        collectionData(allDeposits, "id").subscribe((data) => {
          const country = JSON.parse(localStorage.getItem("country")).country;
          const newCurcode = getCountry(country).currency; // currency code

          const totalDeposit = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);

          const totalPercentage = data.reduce((prv, cur) => {
            return prv + cur.percentage;
          }, 0);

          dispatch(myinvestment$(data));

          dispatch(
            totaldeposit$(
              formatLocaleCurrency(totalDeposit, newCurcode, {
                autoFixed: false,
              })
            )
          );
          if (isNaN(totalPercentage)) {
            dispatch(
              totalprofit$(
                formatLocaleCurrency(0, newCurcode, {
                  autoFixed: false,
                })
              )
            );
          } else {
            //total profits
            const totlProfit = (totalPercentage / 100) * totalDeposit;
            dispatch(
              totalprofit$(
                formatLocaleCurrency(totlProfit, newCurcode, {
                  autoFixed: false,
                })
              )
            );
          }
        });

        //total withdrawn
        const Total_withdrawn = firestore
          .doc(`users/${user.uid}`)
          .collection("deposits")
          .where("return_amount", "==", 0);
        collectionData(Total_withdrawn, "id").subscribe((data) => {
          const country = JSON.parse(localStorage.getItem("country")).country;
          const newCurcode = getCountry(country).currency; // currency code
          const newCursymbol = getSymbolFromCurrency(newCurcode); // currency code
          const totalwithdrawn = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);

          dispatch(
            totalwithdrawn$(
              formatLocaleCurrency(totalwithdrawn, newCurcode, {
                autoFixed: false,
              })
            )
          );
        });

        // bonus balance
        const Bonus = firestore.doc(`users/${user.uid}`).collection("bonus");
        collectionData(Bonus, "id").subscribe((data) => {
          const country = JSON.parse(localStorage.getItem("country")).country;
          const newCurcode = getCountry(country).currency;

          // bonus total recievede bonus
          const bonusTotalRecieved = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);
          converter
            .convert(bonusTotalRecieved, "USD", newCurcode)
            .then((vl) => {
              dispatch(
                totalbonusearned$(
                  formatLocaleCurrency(vl, newCurcode, { autoFixed: false })
                )
              );
            });

          // main remaining bonus balance
          const bonusCurrentBalance = data.reduce((prv, cur) => {
            return prv + cur.deposit_amount;
          }, 0);
          // convert bonus remaining balance to default currency
          converter
            .convert(bonusCurrentBalance, "USD", newCurcode)
            .then((val) => {
              dispatch(
                bonusbalance$(
                  formatLocaleCurrency(Math.floor(val), newCurcode, {
                    autoFixed: false,
                  })
                )
              );
            });

          // bonus collections
          data.forEach((val, index) => {
            converter
              .convert(val.deposit_amount, "USD", newCurcode)
              .then((vl) => {
                val.deposit_amount = formatLocaleCurrency(vl, newCurcode, {
                  autoFixed: false,
                });
                dispatch(bonusCollections$(data));
              })
              .then(() => navigate(""))
              .catch((err) => console.log(err));
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

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const closemenu = () => {
    setMobileOpen(false);
  };

  const handleListItemClick = (index, link, collapse, title) => {
    if (collapse) {
      setSelecteditemSub(index);
      if (title == "settings") {
        setSubmenu({
          ...submenu,
          settings: !submenu.settings,
          withdraw: false,
        });
      } else {
        setSubmenu({
          ...submenu,
          withdraw: !submenu.withdraw,
          settings: false,
        });
      }
    } else {
      setOpenpenTransMenu(false);
      setSelectedSub(null);
      setSelecteditem(index);
      navigate(`/${link}`);
      closemenu();
    }
  };
  const handleSubmenuClick = (index, link, line) => {
    setSelecteditem(null);
    setSelectedSub(line);
    navigate(`/${link}`);
    closemenu();
  };

  const sideNavlinks = [
    {
      name: currentStrings.Nav.Dashboard,
      link: "",

      avater: <AccountBalance color="primary" />,
      submenu: [],
    },
    {
      name: currentStrings.Nav.invest,
      link: "invest",
      avater: <MonetizationOnSharp color="primary" />,
      submenu: [],
    },
    {
      name: "My investment",
      link: "investments",
      avater: <BusinessCenterSharp color="primary" />,
      submenu: [],
    },
    {
      name: "Withdraw bonus",
      link: "withdraw/bonus",
      avater: <GetAppSharp color="primary" />,
    },
    {
      name: "Wallet",
      link: "wallet",
      avater: <AccountBalanceWallet color="primary" />,
      submenu: [],
    },
    {
      name: currentStrings.Nav.support,
      link: "support",
      avater: <LiveHelp color="primary" />,
      submenu: [],
    },
  ];

  const footer = (
    <Box
      className={classes.margintop}
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
    >
      <Typography variant="caption">
        &copy; Coinspringinvest, INC, {new Date().toLocaleDateString()}.
      </Typography>
    </Box>
  );

  const drawer = (
    <div>
      <List component="nav">
        {sideNavlinks.map((links, index) => (
          <div key={index}>
            <ListItem
              button
              selected={selecteditem === index}
              onClick={() =>
                handleListItemClick(
                  index,
                  links.link,
                  links.Collapse,
                  links.title
                )
              }
            >
              <ListItemAvatar>{links.avater}</ListItemAvatar>
              <ListItemText
                primary={<Typography color="initial">{links.name}</Typography>}
              />
              {links.Collapse ? <ExpandMoreSharp /> : null}
            </ListItem>
            {links.menuOpen ? (
              <Collapse in={links.menuOpen} timeout="auto" unmountOnExit>
                <List>
                  {links.submenu.map((menu, index) => (
                    <ListItem
                      button
                      key={index}
                      className={classes.nested}
                      onClick={() =>
                        handleSubmenuClick(index, menu.link, menu.line)
                      }
                    >
                      <ListItemAvatar>
                        <img src={menu.avater} className={classes.avater} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={menu.name}
                        className={
                          selectedSub === menu.line ? classes.navtext : null
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            ) : null}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <div
      className={
        useMediaQuery(useTheme().breakpoints.up("sm"))
          ? classes.root
          : classes.rootblock
      }
    >
      <CssBaseline />
      <AppBar color="secondary" position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
            <img
              src={require("../../images/logo.png")}
              alt="logo"
              width="150px"
            />
          ) : (
            <img
              src={require("../../images/logo.png")}
              alt="logo"
              height="25px"
            />
          )}
          <SelectLanguage />
          <div className={classes.grow} />
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
            <Box>
              <ListItem>
                <ListItemAvatar>
                  <ReactCountryFlag
                    countryCode={values.countrycodeIos2}
                    svg
                    style={{
                      width: "em",
                      height: "2em",
                    }}
                    title={userData.data.country}
                  />
                </ListItemAvatar>

                <ListItemText primary={values.currencyCode} />
              </ListItem>
            </Box>
          ) : null}
          <DasboardMenu />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
            <span className={classes.spacing} />
            {footer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
            <span className={classes.spacing} />
            {footer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {loading.loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={20}
          >
            <PulseLoader
              css={override}
              size={30}
              color={"#2196f3"}
              loading={true}
            />
          </Box>
        ) : (
          props.children
        )}
      </main>
    </div>
  );
}

/* 
  <ListItem>
          <Nightmode />
        </ListItem>
        <Divider />

        <img src={require("../../images/mobile.svg")} width="30" />
*/

export default DashboardLayout;


const firebaseConfig = {
    apiKey: "AIzaSyDeGgFnprcPu0fryzS4KIjuElibM1fMkJg",
    authDomain: "coinspringinvest.firebaseapp.com",
    databaseURL: "https://coinspringinvest.firebaseio.com",
    projectId: "coinspringinvest",
    storageBucket: "coinspringinvest.appspot.com",
    messagingSenderId: "337977634714",
    appId: "1:337977634714:web:4c2947983842e02bc79423",
    measurementId: "G-V2C6D61ZXQ",
  };
