import React, { useEffect, useState, useContext, createContext } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";
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
import Deposit from "./pages/dashboard/transactions/deposit";
import Withdrawal from "./pages/dashboard/transactions/withdrawal";
import Withdraw from "./pages/dashboard/withdraw";
import BonusWithdrawal from "./pages/dashboard/withdraw/bonus";

const store = createStore(allreducer);
store.subscribe(() => console.log(store.getState()));
const dark = store.getState().darkMode;

export const AppContext = createContext();

function App() {
  const [darktheme, setDarktheme] = useState({ status: false });
  const palletType = darktheme.status ? "dark" : "light";
  const secondary = darktheme.status ? "#424242" : "#ffffff";

  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        // Purple and green play nicely together.
        main: deepOrange[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: secondary,
      },
    },
  });
  useEffect(() => {}, []);

  return (
    <Provider store={store}>
      <AppContext.Provider value={{ darktheme, setDarktheme }}>
        <ThemeProvider theme={theme}>
          <Router>
            <HomeLayout path="/" />

            <DashboardLayout path="dashboard">
              <DashboardPage path="/" />
              <Invest path="invest" />
              <Withdraw path="withdraw" />
              <MyInvestments path="investments" />
              <Deposit path="deposit" />
              <Withdrawal path="withdrawal" />
              <Exchange path="exchange" />
              <AccountSettings path="settings" />
              <Support path="support" />
              <BonusWithdrawal path="withdrawbonus"/>
            </DashboardLayout>

            <AccountLayout path="account" />
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </Provider>
  );
}

export default App;
