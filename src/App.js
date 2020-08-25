import React, { useEffect, useState, useContext, createContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange, blue } from "@material-ui/core/colors";
import { Router } from "@reach/router";
import HomeLayout from "./pages/homepage";
import DashboardLayout from "./pages/dashboard";
import AccountLayout from "./pages/account";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allreducer } from "./redux/reducer";
import AccountSettings from "./pages/dashboard/accountsettings";
import DashboardPage from "./pages/dashboard/accountpage";
import MyInvestments from "./pages/dashboard/allinvestments";
import Exchange from "./pages/dashboard/currencyexchange";
import Wallet from "./pages/dashboard/wallet";
import CreditWallet from "./pages/dashboard/wallet/payment";
import CreditSucess from "./pages/dashboard/wallet/creditsuccess";
import Invest from "./pages/dashboard/invest";
import Investment from "./pages/dashboard/invest/myinvestments";
import Invoice from "./pages/dashboard/invest/invoice";
import Support from "./pages/dashboard/support";
import Transactions from "./pages/dashboard/transactions";
import WithdrawBonus from "./pages/dashboard/withdraw/bonus";
import SignIn from "./pages/account/singin";
import SignUp from "./pages/account/signup";
import SignUpReferral from "./pages/account/signupreferral";
import VerifyEmail from "./pages/account/verifyemail";
import VerifyEmailSent from "./pages/account/sentverification";
import ResetPassword from "./pages/account/resetpass";
import InvestBlock from "./pages/homepage/sections/investblock";
import Home from "./pages/homepage/sections/home";
import Signal from "./pages/homepage/sections/signal";
import About from "./pages/homepage/sections/aboutus";
import Locations from "./pages/homepage/sections/locations";
import BlocDatas from "./pages/homepage/sections/blockdata";
import Contactus from "./pages/homepage/sections/contactus";
import Guide from "./pages/homepage/sections/guide";
import Downloads from "./pages/homepage/sections/downloads";
import Security from "./pages/homepage/sections/security";
import { reactLocalStorage } from "reactjs-localstorage";
import Payment from "./components/payment";
import PaymentSuccess from "./components/successpayment";
import Complete from "./components/complete";
import { ajax } from "rxjs/ajax";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { useDispatch } from "react-redux";
import { blocks$ } from "./redux/action";
var cc = require("currency-codes");

const store = createStore(allreducer);
store.subscribe(() => console.log(store.getState()));
const dark = store.getState().darkMode;

export const AppContext = createContext();

function App() {
  const [darktheme, setDarktheme] = useState({
    status: false,
  });
  const [intro, setIntro] = useState({
    layout: "layout",
    countrycode: "",
    mobilecode: "234",
    persistence: false,
    currency_code: "",
  });
  const [currentblock, setCurrentBlock] = useState({ data: {} });
  const [paymentInfo, setPaymentInfo] = useState({
    block: {},
    blockindex: 0,
    amount: 0,
    cryptoType: "LTCT",
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

  const [user, setUser] = useState({ wallet_balance: 0 });

  const palletType = darktheme.status ? "dark" : "dark";
  const secondary = darktheme.status ? "#424242" : "#424242";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        // Purple and green play nicely together.
        main: blue[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: secondary,
      },
      action: {
        selected: "#ef6c001f",
      },
    },
  });
  useEffect(() => {
    /*
    ajax({
      url: "http://localhost:9000/ip",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: {},
    }).subscribe((vl) => {
      console.log(vl);
    });
    */
  }, []);

  return (
    <Provider store={store}>
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
        <ThemeProvider theme={theme}>
          <Router>
            <HomeLayout path="/">
              <Home path="/" />
              <InvestBlock path="invest" />
              <Signal path="signals" />
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
              <Investment path="investments" />
              <Invoice path="invoice" />
              <MyInvestments path="investments" />
              <WithdrawBonus path="withdraw/:page" />
              <Transactions path="transactions" />
              <Wallet path="wallet" />
              <CreditWallet path="payment_wallet" />
              <CreditSucess path="credit_success" />
              <Exchange path="exchange" />
              <AccountSettings path="settings/:page" />
              <Support path="support" />
              <Payment path="payment" />
              <PaymentSuccess path="success" />
              <Complete path="complete" />
            </DashboardLayout>

            <AccountLayout path="account">
              <SignIn path="/" />
              <SignUp path="register" />
              <SignUpReferral path="register/:id" />
              <VerifyEmail path="verifyemail" />
              <VerifyEmailSent path="emailsent/:email" />
              <ResetPassword path="resetpassword" />
            </AccountLayout>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
