import React from "react";
import "./dashboard.css";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import SelectLanguage from "../../components/lang_select";
import DasboardMenu from "./menu";
import Fade from "@material-ui/core/Fade";
import Nightmode from "../../components/Darkmode";
import { navigate } from "@reach/router";
import { ExpandMoreSharp, ExpandLessSharp } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Roboto",
  },
  grow: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    margin: theme.spacing(1),
  },
  navtext: {
    color: deepOrange[500],
  },
  navtextS: {
    color: deepOrange[500],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  displaynone: {
    display: "none",
  },
  display: {
    display: "block",
  },
}));

function DashboardLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const currentStrings = useSelector((state) => state.language);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selecteditem, setSelecteditem] = React.useState(null);
  const [selecteditemSub, setSelecteditemSub] = React.useState(null);

  const [openTransMenu, setOpenpenTransMenu] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const closemenu = () => {
    setMobileOpen(false);
  };

  const handleListItemClick = (index, link, collapse) => {
    if (collapse) {
      setOpenpenTransMenu(!openTransMenu);
    } else {
      setSelecteditemSub(null);
      setSelecteditem(index);
      navigate(`/${link}`);
      closemenu();
    }
  };
  const handleSubmenuClick = (index, link) => {
    setSelecteditem(null);
    setSelecteditemSub(index);
    navigate(`/${link}`);
    closemenu();
  };

  const sideNavlinks = [
    {
      name: currentStrings.Nav.Dashboard,
      link: "dashboard",
      index: 0,
      icon: <InboxIcon color={selecteditem === 0 ? "primary" : "inherit"} />,
    },
    {
      name: currentStrings.Nav.invest,
      link: "dashboard/invest",
      icon: <MailIcon color={selecteditem === 1 ? "primary" : "inherit"} />,
    },
    {
      name: currentStrings.Nav.matured_investment,
      link: "dashboard/withdraw",
      icon: <InboxIcon color={selecteditem === 2 ? "primary" : "inherit"} />,
    },
    {
      name: "Withdraw Bonus",
      link: "dashboard/withdrawbonus",
      icon: <InboxIcon color={selecteditem === 3 ? "primary" : "inherit"} />,
    },
    {
      name: currentStrings.Nav.transactions,
      link: "dashboard/transactions",
      icon: <InboxIcon color={selecteditem === 4 ? "primary" : "inherit"} />,
      Collapse: true,
    },
    {
      name: currentStrings.Nav.converter,
      link: "dashboard/exchange",
      icon: <InboxIcon color={selecteditem === 5 ? "primary" : "inherit"} />,
    },
    {
      name: currentStrings.Nav.settings,
      link: "dashboard/settings",
      icon: <InboxIcon color={selecteditem === 6 ? "primary" : "inherit"} />,
    },
    {
      name: currentStrings.Nav.support,
      link: "dashboard/support",
      icon: <InboxIcon color={selecteditem === 7 ? "primary" : "inherit"} />,
    },
  ];

  const submenu = [
    {
      name: "Deposit",
      link: "dashboard/deposit",
      icon: <InboxIcon color={selecteditemSub === 0 ? "primary" : "inherit"} />,
    },
    {
      name: "Withdrawals",
      link: "dashboard/withdrawal",
      icon: <MailIcon color={selecteditemSub === 1 ? "primary" : "inherit"} />,
    },
  ];

  const drawer = (
    <div>
      <List>
        <ListItem>
          <Nightmode />
        </ListItem>
        <Divider />
        {sideNavlinks.map((links, index) => (
          <div key={index}>
            <ListItem
              button
              onClick={() =>
                handleListItemClick(index, links.link, links.Collapse)
              }
            >
              <ListItemIcon>{links.icon}</ListItemIcon>
              <ListItemText
                primary={links.name}
                className={selecteditem === index ? classes.navtext : null}
              />
              {openTransMenu ? (
                <ExpandLessSharp
                  className={
                    links.Collapse ? classes.display : classes.displaynone
                  }
                />
              ) : (
                <ExpandMoreSharp
                  className={
                    links.Collapse ? classes.display : classes.displaynone
                  }
                />
              )}
            </ListItem>
            {links.Collapse ? (
              <Collapse in={openTransMenu} timeout="auto" unmountOnExit>
                <List>
                  {submenu.map((menu, index) => (
                    <ListItem
                      key={index}
                      button
                      className={classes.nested}
                      onClick={() => handleSubmenuClick(index, menu.link)}
                    >
                      <ListItemIcon>{menu.icon}</ListItemIcon>
                      <ListItemText
                        primary={menu.name}
                        className={
                          selecteditemSub === index ? classes.navtext : null
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            ) : null}
          </div>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="secondary" position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
            <img
              src={require("../../images/logodesktop.svg")}
              alt="logo"
              width="150px"
            />
          ) : (
            <img
              src={require("../../images/mobile.svg")}
              alt="logo"
              height="50px"
            />
          )}
          <SelectLanguage />
          <div className={classes.grow} />
          <DasboardMenu />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default DashboardLayout;
