import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { AppContext } from "../../App";
import { Box } from "@material-ui/core";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    height: "0.4em",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: theme.palette.secondary.main,
      borderTopLeftRadius: "50px",
      borderTopRightRadius: "50px",
    },
  },
}))((props) => (
  <Tabs
    {...props}
    // centered={useMediaQuery(useTheme().breakpoints.up("sm")) ? false : true}
    TabIndicatorProps={{ children: <span /> }}
  />
));

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.getContrastText("#2196f3"),
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: theme.palette.primary.main,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `simple-tabs-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CustomizedTabs() {
  const classes = useStyles();
  const { tabs, currentab, setCurrentab } = useContext(AppContext);
  const [value, setValue] = React.useState(currentab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentab(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          {tabs.map((tab, index) => (
            <StyledTab label={tab.title} key={index} {...allyProps(index)} />
          ))}
        </StyledTabs>
      </div>
    </div>
  );
}
