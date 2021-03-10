import React, { useEffect, useState, createContext } from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { jssPreset, StylesProvider, ThemeProvider } from "@material-ui/styles";
import { blue } from "@material-ui/core/colors";
import { navigate, Router } from "@reach/router";
import HomeLayout from "./pages/homepage";
import DashboardLayout from "./pages/dashboard/indexnew";
import AccountLayout from "./pages/account";
import AccountSettings from "./pages/dashboard/accountsettings";
import DashboardPage from "./pages/dashboard/accountpage/indexnew";
import MyInvestments from "./pages/dashboard/allinvestments";
import Wallet from "./pages/dashboard/wallet";
import Profile from "./pages/dashboard/profile";
import CreditWallet from "./pages/dashboard/wallet/payment";
import CreditSucess from "./pages/dashboard/wallet/creditsuccess";
import Invest from "./pages/dashboard/invest/indexnew";
import Withdrawals from "./pages/dashboard/withdraw";
import Investment from "./pages/dashboard/invest/myinvestments";
import Invoice from "./pages/dashboard/invest/invoice";
import Support from "./pages/dashboard/support";
import Transactions from "./pages/dashboard/transactions";
import WithdrawBonus from "./pages/dashboard/withdraw/bonus";
import Withdrawform from "./pages/dashboard/withdraw/withdraw";
import SignIn from "./pages/account/singin";
import SignUp from "./pages/account/signup";
import SignUpReferral from "./pages/account/signupreferral";
import VerifyEmail from "./pages/account/verifyemail";
import VerifyEmailSent from "./pages/account/sentverification";
import ResetPassword from "./pages/account/resetpass";
import SignInAdmin from "./pages/admin/login";
import DashboardAdmin from "./pages/admin/dashboard";
import InvestBlock from "./pages/homepage/sections/investblock";
import Home from "./pages/homepage/sections/home";
import Faqs from "./pages/homepage/sections/faq";
import About from "./pages/homepage/sections/aboutus";
import Locations from "./pages/homepage/sections/locations";
import BlocDatas from "./pages/homepage/sections/blockdata";
import Contactus from "./pages/homepage/sections/contactus";
import Guide from "./pages/homepage/sections/guide";
import Downloads from "./pages/homepage/sections/downloads";
import Security from "./pages/homepage/sections/security";
import { reactLocalStorage } from "reactjs-localstorage";
import Kyc from "./pages/admin/kyc";
import CreditBonus from "./pages/admin/dashboard/creditbonus";
import DeleteUsers from "./pages/admin/dashboard/deleteuser";
import Investments from "./pages/admin/investments";
import TransactionsAdmin from "./pages/admin/transactions";
import UpdateWallet from "./pages/admin/transactions/updatewallet";
import Payment from "./components/payment";
import PaymentSuccess from "./components/successpayment";
import Complete from "./components/complete";
import AdminLayout from "./pages/admin";
import Tables from "./pages/homepage/component/trnanstble";
import DepositTable from "./pages/homepage/component/trnanstble/depositable";
import WithdrawTable from "./pages/homepage/component/trnanstble/withdrawtable";
import { ajax } from "rxjs/ajax";
import { useDispatch, useSelector } from "react-redux";
import { language$, loading$ } from "./redux/action";
import { Converter } from "easy-currencies";
import { blocks } from "./service/tradeblocks";
import { formatLocaleCurrency } from "country-currency-map/lib/formatCurrency";
import { Strings } from "./lang/language";
import detectBrowserLanguage from "detect-browser-language";
import { firestore } from "./config";

import {
  ForumSharp,
  MessageSharp,
  Telegram,
  WhatsApp,
} from "@material-ui/icons";
import UpdateCurrency from "./pages/admin/dashboard/updatecurrency";
// import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { Fab } from "@material-ui/core";

const tawkTo = require("tawkto-react");
const tawkToPropertyId = "5feb0864df060f156a91965a";

let converter = new Converter(
  "OpenExchangeRates",
  "b0e02e52f17b4f2a874d46b3deae060a"
);

const useStyles = makeStyles((theme) => ({
  floaticon: {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "20px",
    right: "10px",
    backgroundColor: "#fff",

    borderRadius: "50px",
    textAlign: "center",
    fontSize: "30px",
    zIndex: "100",
  },
  floaticonmobile: {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "20px",
    left: "80px",
    backgroundColor: "#fff",

    borderRadius: "50px",
    textAlign: "center",
    fontSize: "30px",
    zIndex: "100",
  },
}));

var getCountry = require("country-currency-map").getCountry;

export const AppContext = createContext();

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentStrings = useSelector((state) => state.language);
  const [darktheme, setDarktheme] = useState({
    status: true,
  });
  const [rightoleft, setRightoleft] = useState({
    status: false,
  });
  const [currentlanguage, setCurrentlanguage] = useState(
    currentStrings.language
  );
  const [pagetitle, setPagetitle] = useState({
    title: "",
  });
  const [intro, setIntro] = useState({
    layout: "",
    countrycode: "",
    mobilecode: "234",
    persistence: false,
    currency_code: "",
    refid: "",
  });
  const [currentblock, setCurrentBlock] = useState({ data: {} });
  const [paymentInfo, setPaymentInfo] = useState({
    block: {},
    blockindex: 0,
    amount: 0,
    cryptoType: "BTC",
    userid: "",
    info: {},
  });
  const [userData, setUserData] = useState({
    data: {},
    currencyInfo: {
      countrycode: "",
      currencysymbol: "",
    },
  });
  const [balance, setBalance] = useState({
    balance: {
      deposit_balance: 0,
      bonus_balance: 0,
    },
  });

  const [MinDeposits, setMinDeposit] = useState({
    block1: 50,
    block2: 100,
    block3: 1000,
    block4: 10000,
    block5: 100000,
  });

  const [tabs, setTabs] = useState([]);
  const [transactiondatas, setTransactiondatas] = useState([]);

  const [currentab, setCurrentab] = useState(0);

  const [user, setUser] = useState({ wallet_balance: 0 });
  const [updateWalletBalance, setupdateWalletBalance] = useState({
    status: false,
  });
  const [converted, setConverted] = useState({ status: false });

  const palletType = darktheme.status ? "dark" : "light";
  const secondary = darktheme.status ? "#09132e" : "#fff";

  // Configure JSS
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  const theme = createMuiTheme({
    direction: rightoleft.status ? "rtl" : "ltr",
    palette: {
      type: palletType,
      primary: {
        // Purple and green play nicely together.
        main: blue[800],
      },
      secondary: {
        // This is green.A700 as hex.
        main: secondary,
      },
      background: {
        default: "#0d1117",
        paper: "#09132e",
      },
      action: {
        selected: "#2196f33d",
      },
    },
  });

  // right to left function
  function setRtl(lang) {
    switch (lang) {
      case "ar":
        return setRightoleft({ status: true });
      default:
        return setRightoleft({ status: false });
    }
  }

  useEffect(() => {
    console.log(detectBrowserLanguage());
    Strings.setLanguage(detectBrowserLanguage());
    dispatch(language$(Strings));
    setRtl(detectBrowserLanguage()); // set right to left fuction

    const localstore = reactLocalStorage.getObject("country").country;

    const add_to_storage = (country, currencycode) => {
      // set localstorage country data
      reactLocalStorage.setObject("country", {
        country: country.name,
        dail_coe: country.dial_code,
        code: country.code,
        currencycode: currencycode, // or currencyCode
      });
      window.location.reload();
    };

    if (localstore) {
      dispatch(loading$());
      console.log(reactLocalStorage.getObject("country"));
      //  reactLocalStorage.clear();
      // convert investment plan
      const currency = reactLocalStorage.getObject("country").currencycode;
      blocks.forEach((val, inex) => {
        val.lot = formatLocaleCurrency(Math.floor(val.lot), currency);

        val.max = formatLocaleCurrency(Math.floor(val.max), currency);
        navigate("");
      });
      // end convert investment plan

      firestore
        .collection("transactions")

        .get()
        .then((dataval) => {
          dataval.docs.forEach((doc) => {
           
            transactiondatas.push(doc.data());
          });
        })
        .then(() => {
          dispatch(loading$());
        })
        .catch((err) => {
          console.log(err);
          dispatch(loading$());
        });
    } else {
      add_to_storage(
        { name: "United States", dial_code: "+1", code: "US" },
        "USD"
      );

      /*

      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("https://ip.relianceexchange.co", requestOptions)
        .then((response) => response.json())
        .then((ip) => {
          console.log(ip);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({ ip: ip.ip });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          // get country info from ip
          fetch(
            "https://relianceexchange.herokuapp.com/ip/country",
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              const country = countrylist.filter(function (obj) {
                return obj.code == result.country;
              })[0];
              const currencyCode = getCountry(country.name).currency; // get currenvy code

              // set localstorage country data
              add_to_storage(country, "USD");
            })
            .catch((error) => {
              add_to_storage(
                { name: "United States", dial_code: "+1", code: "US" },
                "USD"
              );
              console.log("error", error);
            });
        })
        .catch((error) => {
          add_to_storage(
            { name: "United States", dial_code: "+1", code: "US" },
            "USD"
          );
          console.log("error", error);
        });

        */
    }
  }, []);

  /*
<HomeLayout path="/">
              <Home path="/" />
              <InvestBlock path="invest" />
              <Faqs path="Faqss" />
              <About path="about" />
              <Locations path="locations" />
              <BlocDatas path="tradedatas" />
              <Downloads path="downloads/:page" />
              <Contactus path="contact" />
              <Guide path="guide" />
              <Security path="security/:page" />
            </HomeLayout>
  */

  return (
    <AppContext.Provider
      value={{
        darktheme,
        intro,
        currentblock,
        paymentInfo,
        userData,
        balance,
        user,
        MinDeposits,
        updateWalletBalance,
        tabs,
        currentab,
        pagetitle,
        rightoleft,
        converted,
        currentlanguage,
        transactiondatas,
        setTransactiondatas,
        setCurrentlanguage,
        setConverted,
        setRightoleft,
        setPagetitle,
        setCurrentab,
        setTabs,
        setupdateWalletBalance,
        setMinDeposit,
        setUser,
        setBalance,
        setUserData,
        setPaymentInfo,
        setCurrentBlock,
        setDarktheme,
        setIntro,
      }}
    >
      <div dir={rightoleft.status ? "rtl" : "ltr"}>
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <Router>
              <HomeLayout path="/">
                <Home path="/" />
                <Home path="/:refid" />
                <InvestBlock path="invest" />
                <Faqs path="faq" />
                <About path="about" />
                <Locations path="locations" />
                <BlocDatas path="tradedatas" />
                <Downloads path="downloads/:page" />
                <Contactus path="contact" />
                <Guide path="guide" />
                <Security path="security/:page" />
              </HomeLayout>

              <DashboardLayout path="dashboard">
                <DashboardPage path="/" />
                <Invest path="invest" />
                <Withdrawals path="withdraw" />
                <Investment path="investments" />
                <Invoice path="invoice" />
                <MyInvestments path="investments" />
                <WithdrawBonus path="withdraw/:page" />
                <Withdrawform path="withdrawform" />
                <Transactions path="transactions" />
                <Wallet path="wallet" />
                <CreditWallet path="payment_wallet" />
                <CreditSucess path="credit_success" />
                <Profile path="profile" />
                <AccountSettings path="settings/:page" />
                <Support path="support" />
                <Payment path="payment" />
                <PaymentSuccess path="success" />
                <Complete path="complete" />
              </DashboardLayout>

              <AccountLayout path="account">
                <SignIn path="/" />
                <SignInAdmin path="admin" />
                <SignUp path="register" />
                <SignUpReferral path="register/:id" />
                <VerifyEmail path="verifyemail" />
                <VerifyEmailSent path="emailsent/:email" />
                <ResetPassword path="resetpassword" />
              </AccountLayout>

              <AdminLayout path="manager">
                <DashboardAdmin path="/" />
                <CreditBonus path="creditbonus" />
                <DeleteUsers path="deleteuser" />
                <TransactionsAdmin path="transactions" />
                <UpdateWallet path="updatewallet" />
                <Kyc path="kyc" />
                <Investments path="investments" />
                <UpdateCurrency path="convert" />
              </AdminLayout>

              <Tables path="tables">
                <WithdrawTable path="withdrawtable" />
                <DepositTable path="depositable" />
              </Tables>
            </Router>
          </ThemeProvider>
        </StylesProvider>
      </div>
      <Fab
        className={classes.floaticon}
        onClick={() => {
          window.open(
            "https://tawk.to/chat/603f0f471c1c2a130d644215/default",
            "_blank"
          );
        }}
      >
        <Telegram color="primary" fontSize="large" />
      </Fab>
    </AppContext.Provider>
  );
}

export default App;

/*

 <Fab
        className={classes.floaticon}
        onClick={() => {
          window.open(
            "https://tawk.to/chat/603f0f471c1c2a130d644215/default",
            "_blank"
          );
        }}
      >
        <Telegram color="primary" fontSize="large" />
      </Fab>

      
 <Fab
        icon={<MessageSharp />}
        event="hover"
        alwaysShowTitle={true}
        //  onClick={() => console.log("works")}
      >
        <Action
          text="Whatsapp"
          children={<WhatsApp />}
          onClick={() => {
            window.open(
              "https://wa.me/4915217692230",
              "_blank"
            );
          }}
        />
        <Action
          text="Livechat"
          children={<ForumSharp />}
          onClick={() => {
            window.open(
              "https://tawk.to/chat/603f0f471c1c2a130d644215/default",
              "_blank"
            );
          }}
        />
      </Fab>
    
      */
