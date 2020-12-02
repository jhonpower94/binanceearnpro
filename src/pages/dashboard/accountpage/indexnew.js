import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles, Box, Typography, Container } from "@material-ui/core";
import { AppContext } from "../../../App";
import Account from "./account";
import AccountInfo from "./accountinfo";
import Wallet from "../wallet";
import Withdrawform from "../withdraw/withdraw";
import InvestNew from "../invest";
import Invoice from "../invest/invoice";
import Invest from "../invest/indexnew";
import Investment from "../invest/myinvestments";
import CustomizedTabs from "../tabs";

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

const useStyles = makeStyles((theme) => ({
  margintop: {
    marginTop: theme.spacing(4),
  },
}));

function DashboardPage(props) {
  const classes = useStyles();
  const { tabs, setTabs, currentab, pagetitle, setPagetitle } = useContext(AppContext);

  useEffect(() => {
    setTabs([
      { title: "Account", tab: 0 },
      { title: "Account Info", tab: 1 },
    ]);
    setPagetitle({ ...pagetitle, title: "Account" });
  }, []);

  return (
    <React.Fragment>
      <CustomizedTabs />

      <Container className={classes.margintop}>
        <TabPanel value={currentab} index={0}>
          <Account />
        </TabPanel>
        <TabPanel value={currentab} index={1}>
          <AccountInfo />
        </TabPanel>
      </Container>
    </React.Fragment>
  );
}

export default DashboardPage;

/*
 <TabPanel value={currentab} index={2}>
          <Investment />
        </TabPanel>
        <TabPanel value={currentab} index={3}>
          <Wallet />
        </TabPanel>
        <TabPanel value={currentab} index={4}>
          <Invoice />
        </TabPanel>
        <TabPanel value={currentab} index={5}>
        <WithdrawBonus />
      </TabPanel>
      <TabPanel value={currentab} index={6}>
        <Withdrawform />
      </TabPanel>
      <TabPanel value={currentab} index={7}>
        <AccountInfo />
      </TabPanel>
      */
