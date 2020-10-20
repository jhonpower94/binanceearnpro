import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../App";
import { makeStyles, Container } from "@material-ui/core";

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
    marginTop: theme.spacing(5),
  },
}));

function Invest() {
  const classes = useStyles();
  const { tabs, setTabs, currentab } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTabs([
      { title: "Invest", tab: 0 },
      { title: "investments", tab: 1 },
    ]);
  }, []);

  return (
    <React.Fragment>
      <TabPanel value={currentab} index={0}>
        invest
      </TabPanel>
      <TabPanel value={currentab} index={1}>
        investments
      </TabPanel>
    </React.Fragment>
  );
}

export default Invest;
