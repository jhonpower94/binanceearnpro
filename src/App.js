import React, { useEffect } from "react";
import { Router } from "@reach/router";
import HomeLayout from "./pages/homepage";
import DashboardLayout from "./pages/dashboard";
import AccountLayout from "./pages/account";


function App() {
  useEffect(() => {}, []);

  return (
    <Router>
      <HomeLayout path="/" />
      <DashboardLayout path="dashboard" />
      <AccountLayout path="account" />
    </Router>
  );
}

export default App;
