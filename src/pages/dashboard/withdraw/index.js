import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { makeStyles, Container } from "@material-ui/core";
import { AppContext } from "../../../App";
import CustomizedTabs from "../tabs";
import Investment from "../invest/myinvestments";
import WithdrawBonus from "./bonus";

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

function Withdrawals(props) {
  const classes = useStyles();
  const { setTabs, currentab, pagetitle, setPagetitle } = useContext(AppContext);

  useEffect(() => {
    setTabs([
      { title: "Investments", tab: 0 },
      { title: "Bonus", tab: 1 },
    ]);
    setPagetitle({ ...pagetitle, title: "Withdraw" });
  }, []);

  return (
    <React.Fragment>
      <CustomizedTabs />

      <Container className={classes.margintop}>
        <TabPanel value={currentab} index={0}>
          <Investment />
        </TabPanel>
        <TabPanel value={currentab} index={1}>
          <WithdrawBonus />
        </TabPanel>
      </Container>
    </React.Fragment>
  );
}

export default Withdrawals;

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
