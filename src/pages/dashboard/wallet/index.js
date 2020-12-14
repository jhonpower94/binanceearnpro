import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles,Container } from "@material-ui/core";
import { AppContext } from "../../../App";
import CustomizedTabs from "../tabs";
import Deposit from "./deposit";
import Withdrawform from "../withdraw/withdraw";
import { useSelector } from "react-redux";

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

function Wallet(props) {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { setTabs, currentab, pagetitle, setPagetitle } = useContext(AppContext);

  useEffect(() => {
    setTabs([
      { title: currentStrings.Dashboard.tabs.deposit, tab: 0 },
      { title: currentStrings.Dashboard.tabs.withdraw, tab: 1 },
    ]);
    setPagetitle({ ...pagetitle, title: currentStrings.Dashboard.titles.wallet });
  }, []);

  return (
    <React.Fragment>
      <CustomizedTabs />

      <Container className={classes.margintop}>
        <TabPanel value={currentab} index={0}>
          <Deposit />
        </TabPanel>
        <TabPanel value={currentab} index={1}>
          <Withdrawform />
        </TabPanel>
      </Container>
    </React.Fragment>
  );
}

export default Wallet;

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
