import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { makeStyles, Box, Typography } from "@material-ui/core";
import { AppContext } from "../../../App";
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

const useStyles = () => {
  return makeStyles((theme) => ({}));
};

function DashboardPage(props) {
  const classes = useStyles();
  const { currentab } = useContext(AppContext);

  return (
    <React.Fragment>
      <TabPanel value={currentab} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={currentab} index={1}>
        <AccountInfo />
      </TabPanel>
    </React.Fragment>
  );
}

export default DashboardPage;
