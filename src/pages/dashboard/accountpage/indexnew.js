import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles, Box, Typography } from "@material-ui/core";
import { AppContext } from "../../../App";
import Account from "./account";
import AccountInfo from "./accountinfo";
import Wallet from "../wallet";
import Withdrawform from "../withdraw/withdraw";
import InvestNew from "../invest";
import Invoice from "../invest/invoice";
import Invest from "../invest/indexnew";
import Investment from "../invest/myinvestments";

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
      {value === index && <div>{children}</div>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = () => {
  return makeStyles((theme) => ({}));
};

function DashboardPage(props) {
  const classes = useStyles();
  const { tabs, setTabs, currentab } = useContext(AppContext);

  useEffect(() => {
    setTabs([
      { title: "Account", tab: 0 },
      { title: "Invest", tab: 1 },
      { title: "Investments", tab: 2 },
      { title: "Deposit", tab: 3 },
    ]);
  }, []);

  return (
    <React.Fragment>
      <TabPanel value={currentab} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={currentab} index={1}>
        <InvestNew />
      </TabPanel>
      <TabPanel value={currentab} index={2}>
        <Investment />
      </TabPanel>
      <TabPanel value={currentab} index={3}>
        <Wallet />
      </TabPanel>
      <TabPanel value={currentab} index={4}>
        <Invoice />
      </TabPanel>
    </React.Fragment>
  );
}

export default DashboardPage;
