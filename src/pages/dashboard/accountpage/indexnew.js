import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";

import { Container, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AppContext } from "../../../App";
import CustomizedTabs from "../tabs";
import Account from "./account";
import AccountInfo from "./accountinfo";

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
  const currentStrings = useSelector((state) => state.language);
  const { tabs, setTabs, currentab, pagetitle, setPagetitle } = useContext(
    AppContext
  );

  useEffect(() => {
    setTabs([
      { title: currentStrings.Dashboard.tabs.account, tab: 0 },
      { title: currentStrings.Dashboard.tabs.acount_info, tab: 1 },
    ]);
    setPagetitle({
      ...pagetitle,
      title: currentStrings.Dashboard.titles.home,
    });
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
