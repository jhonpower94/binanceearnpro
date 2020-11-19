import React, { useEffect, useState, useContext, createContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange, blue } from "@material-ui/core/colors";
import { Router } from "@reach/router";
import HomeLayout from "./pages/homepage";
import DashboardLayout from "./pages/dashboard/indexnew";
import AccountLayout from "./pages/account";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { allreducer } from "./redux/reducer";
import AccountSettings from "./pages/dashboard/accountsettings";
import DashboardPage from "./pages/dashboard/accountpage/indexnew";
import Account from "./pages/dashboard/accountpage/account";
import AccountInfo from "./pages/dashboard/accountpage/accountinfo";
import MyInvestments from "./pages/dashboard/allinvestments";
import Exchange from "./pages/dashboard/currencyexchange";
import Wallet from "./pages/dashboard/wallet";
import Profile from "./pages/dashboard/profile";
import CreditWallet from "./pages/dashboard/wallet/payment";
import CreditSucess from "./pages/dashboard/wallet/creditsuccess";
import Invest from "./pages/dashboard/invest/indexnew";
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
    status: true,
  });
  const [intro, setIntro] = useState({
    layout: "",
    countrycode: "",
    mobilecode: "234",
    persistence: false,
    currency_code: "",
    homepage: true,
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

  const [currentab, setCurrentab] = useState(0);

  const [user, setUser] = useState({ wallet_balance: 0 });
  const [updateWalletBalance, setupdateWalletBalance] = useState({
    status: false,
  });

  const palletType = darktheme.status ? "dark" : "light";
  const secondary = darktheme.status ? "#fafafa" : "#ffffff";

  const theme = createMuiTheme({
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
      action: {
        selected: "#2196f33d",
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
          updateWalletBalance,
          tabs,
          currentab,
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
        <ThemeProvider theme={theme}>
          <Router>
            <HomeLayout path="/">
              <Home path="/" />
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
            </AdminLayout>

            <Tables path="tables">
              <WithdrawTable path="withdrawtable" />
              <DepositTable path="depositable" />
            </Tables>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
