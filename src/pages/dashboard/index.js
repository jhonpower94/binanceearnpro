import React, { useEffect, useContext } from "react";
import clsx from "clsx";
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
  selectedmenuItem$,
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
  AccountBalance,
  MonetizationOnSharp,
  BusinessCenterSharp,
  GetAppSharp,
  AccountBalanceWallet,
  LiveHelp,
  ArrowForwardIos,
} from "@material-ui/icons";
import { ListItemAvatar, Box, Typography, Link } from "@material-ui/core";
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
  toolbar: {
    marginTop: theme.spacing(15),
  },
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
  link: {
    marginRight: theme.spacing(3),
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  linkcolor: {
    color: theme.palette.getContrastText("#000000"),
  },
  linkarrow: {
    marginLeft: theme.spacing(0.5),
  },
  ceneter: {
    textAlign: "center",
    display: "flex",
    overflow: "auto",
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
            const country = JSON.parse(localStorage.getItem("country")).country;
            console.log(JSON.parse(localStorage.getItem("country")).country);
            const newCurcode = getCountry(country).currency; // currency code
            const newCursymbol = getSymbolFromCurrency(newCurcode); // currency code

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
              formatLocaleCurrency(Math.floor(returnTotal), "USD", {
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
            const pasint = parseInt(cur.percentage);
            return prv + cur.percentage;
          }, 0);

          console.log(totalPercentage);

          dispatch(myinvestment$(data));

          dispatch(
            totaldeposit$(
              formatLocaleCurrency(totalDeposit, "USD", {
                autoFixed: false,
              })
            )
          );
          if (isNaN(totalPercentage)) {
            const totlProfitx = (totalPercentage / 100) * totalDeposit;
            dispatch(
              totalprofit$(
                formatLocaleCurrency(0, "USD", {
                  autoFixed: false,
                })
              )
            );
          } else {
            //total profits
            const totlProfit = (totalPercentage / 100) * totalDeposit;
            dispatch(
              totalprofit$(
                formatLocaleCurrency(totlProfit, "USD", {
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
              formatLocaleCurrency(totalwithdrawn, "USD", {
                autoFixed: false,
              })
            )
          );
        });

        // bonus balance
        const Bonus = firestore
          .doc(`users/${user.uid}`)
          .collection("bonus")
          .orderBy("created_at", "desc");
        collectionData(Bonus, "id").subscribe((data) => {
          const country = JSON.parse(localStorage.getItem("country")).country;
          const newCurcode = getCountry(country).currency;

          // bonus total recievede bonus
          const bonusTotalRecieved = data.reduce((prv, cur) => {
            return prv + cur.amount;
          }, 0);
          dispatch(
            totalbonusearned$(
              formatLocaleCurrency(bonusTotalRecieved, "USD", {
                autoFixed: false,
              })
            )
          );

          // main remaining bonus balance
          const bonusCurrentBalance = data.reduce((prv, cur) => {
            return prv + cur.deposit_amount;
          }, 0);

          dispatch(
            bonusbalance$(
              formatLocaleCurrency(Math.floor(bonusCurrentBalance), "USD", {
                autoFixed: false,
              })
            )
          );

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
      name: "Deposit",
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

  const link = [
    { name: "Account", link: "" },
    { name: "Invest", link: "invest" },
    { name: "Investments", link: "investments" },
    { name: "Bonus", link: "withdraw/bonus" },
    { name: "Deposit", link: "wallet" },
    { name: "Withdraw", link: "withdrawform" },
    { name: "Profile", link: "profile" },
    { name: "Support", link: "support" },
  ];

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
      <AppBar color="secondary">
        <Toolbar>
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
                      width: "2em",
                      height: "2em",
                    }}
                    title={userData.data.country}
                  />
                </ListItemAvatar>

                <ListItemText primary="USD" />
              </ListItem>
            </Box>
          ) : null}
          <DasboardMenu />
        </Toolbar>
        <Toolbar>
          <div className={classes.ceneter}>
            {link.map((lnk, index) => (
              <Link
                key={index}
                component="button"
                variant="body1"
                color="textSecondary"
                className={
                  select == index
                    ? classes.link
                    : clsx(classes.link, classes.linkcolor)
                }
                onClick={() => navigate(`/${lnk.link}`)}
              >
                {lnk.name}
              </Link>
            ))}
          </div>

          <ArrowForwardIos
            fontSize="small"
            color="disabled"
            className={
              useMediaQuery(useTheme().breakpoints.up("sm"))
                ? classes.displaynone
                : classes.linkarrow
            }
          />
        </Toolbar>
      </AppBar>

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
          <React.Fragment>{props.children}</React.Fragment>
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
