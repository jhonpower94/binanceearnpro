import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../App";
import { makeStyles, Container } from "@material-ui/core";
import InvestNew from ".";
import Invoice from "./invoice";
import Investment from "./myinvestments";
import AccountInfo from "../accountpage/accountinfo";
import WithdrawBonus from "../withdraw/bonus";
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

function Invest() {
  const classes = useStyles();
  const currentStrings = useSelector((state) => state.language);
  const { pagetitle, setPagetitle } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPagetitle({ ...pagetitle, title: currentStrings.Dashboard.titles.invest });
  }, []);

  return (
    <Container className={classes.margintop}>
      <InvestNew />
    </Container>
  );
}

export default Invest;
