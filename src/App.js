import React, { useEffect } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";
import { Router } from "@reach/router";
import HomeLayout from "./pages/homepage";
import DashboardLayout from "./pages/dashboard";
import AccountLayout from "./pages/account";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: deepOrange[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#ffffff",
    },
  },
});

function App() {
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <HomeLayout path="/" />
        <DashboardLayout path="dashboard" />
        <AccountLayout path="account" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
