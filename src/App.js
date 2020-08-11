import React, { useEffect, useState, useContext, createContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
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
import Invest from "./pages/dashboard/invest";
import Support from "./pages/dashboard/support";
import Transactions from "./pages/dashboard/transactions";
import Investment from "./pages/dashboard/invest/myinvestments";
import WithdrawBonus from "./pages/dashboard/withdraw/bonus";
import SignIn from "./pages/account/singin";
import SignUp from "./pages/account/signup";
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

const store = createStore(allreducer);
store.subscribe(() => console.log(store.getState()));
const dark = store.getState().darkMode;

export const AppContext = createContext();

function App() {
  const [darktheme, setDarktheme] = useState({
    status: reactLocalStorage.getObject("var").darkmode,
  });
  const [intro, setIntro] = useState({
    layout: "layout",
  });
  const palletType = darktheme.status ? "dark" : "light";
  const secondary = darktheme.status ? "#424242" : "#ffffff";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        // Purple and green play nicely together.
        main: orange[800],
      },
      secondary: {
        // This is green.A700 as hex.
        main: secondary,
      },
    },
  });
  useEffect(() => {
    console.log(reactLocalStorage.getObject("var"));
  }, []);

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ darktheme, intro, setDarktheme, setIntro }}>
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
              <MyInvestments path="investments" />
              <WithdrawBonus path="withdraw/:page" />
              <Transactions path="transactions" />
              <Exchange path="exchange" />
              <AccountSettings path="settings/:page" />
              <Support path="support" />
            </DashboardLayout>

            <AccountLayout path="account">
              <SignIn path="/" />
              <SignUp path="register" />
              <ResetPassword path="resetpassword" />
            </AccountLayout>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
