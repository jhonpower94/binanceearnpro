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
import {
  ExpandMoreSharp,
  ExpandLessSharp,
  AddCircleSharp,
  AddShoppingCartRounded,
} from "@material-ui/icons";
import { Button, ListItemAvatar } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    fontFamily: "Roboto",
  },
  rootblock: {
    display: "block",
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
  avater: {
    width: "2.5em",
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
  const [selectedSub, setSelectedSub] = React.useState(null);

  const [openTransMenu, setOpenpenTransMenu] = React.useState(false);
  const [submenu, setSubmenu] = React.useState({
    withdraw: false,
    settings: false,
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const closemenu = () => {
    setMobileOpen(false);
  };

  const handleListItemClick = (index, link, collapse, title) => {
    if (collapse) {
      setSelecteditemSub(index);
      if (title == "settings") {
        setSubmenu({
          ...submenu,
          settings: !submenu.settings,
          withdraw: false,
        });
      } else {
        setSubmenu({
          ...submenu,
          withdraw: !submenu.withdraw,
          settings: false,
        });
      }
    } else {
      setOpenpenTransMenu(false);
      setSelectedSub(null);
      setSelecteditem(index);
      navigate(`/${link}`);
      closemenu();
    }
  };
  const handleSubmenuClick = (index, link, line) => {
    setSelecteditem(null);
    setSelectedSub(line);
    navigate(`/${link}`);
    closemenu();
  };

  const sideNavlinks = [
    {
      name: currentStrings.Nav.Dashboard,
      link: "dashboard",
      index: 0,
      avater: require("./icons/balance.svg"),
      submenu: [],
    },
    {
      name: currentStrings.Nav.invest,
      link: "dashboard/invest",
      avater: require("./icons/briefcase.svg"),
      submenu: [],
    },
    {
      name: "My trades",
      link: "dashboard/investments",
      avater: require("./icons/investments.svg"),
      submenu: [],
    },
    {
      name: "Withdraw bonus",
      link: "dashboard/withdraw/bonus",
      avater: require("./icons/withdrawbonus.svg"),
    },
    {
      name: currentStrings.Nav.transactions,
      link: "dashboard/transactions",
      avater: require("./icons/history.svg"),
    },
    {
      name: currentStrings.Nav.converter,
      link: "dashboard/exchange",
      avater: require("./icons/exchange.svg"),
      submenu: [],
    },
    {
      name: currentStrings.Nav.settings,
      title: "settings",
      avater: require("./icons/settings.svg"),
      Collapse: true,
      menuOpen: submenu.settings,
      submenu: [
        {
          name: "Reset password",
          link: "dashboard/settings/password",
          line: 5,
          avater: require("./icons/resetpass.svg"),
        },
        {
          name: "change email address",
          link: "dashboard/settings/address",
          line: 6,
          avater: require("./icons/email.svg"),
        },
      ],
    },
    {
      name: currentStrings.Nav.support,
      link: "dashboard/support",
      avater: require("./icons/support.svg"),
      submenu: [],
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
                handleListItemClick(
                  index,
                  links.link,
                  links.Collapse,
                  links.title
                )
              }
            >
              <ListItemAvatar>
                <img src={links.avater} className={classes.avater} alt="image" />
              </ListItemAvatar>
              <ListItemText
                primary={links.name}
                className={selecteditem === index ? classes.navtext : null}
              />
              {links.Collapse ? <ExpandMoreSharp /> : null}
            </ListItem>
            {links.menuOpen ? (
              <Collapse in={links.menuOpen} timeout="auto" unmountOnExit>
                <List>
                  {links.submenu.map((menu, index) => (
                    <ListItem
                      button
                      key={index}
                      className={classes.nested}
                      onClick={() =>
                        handleSubmenuClick(index, menu.link, menu.line)
                      }
                    >
                      <ListItemAvatar>
                        <img src={menu.avater} className={classes.avater} />
                      </ListItemAvatar>

                      <ListItemText
                        primary={menu.name}
                        className={
                          selectedSub === menu.line ? classes.navtext : null
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
    <div
      className={
        useMediaQuery(useTheme().breakpoints.up("sm"))
          ? classes.root
          : classes.rootblock
      }
    >
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
          {useMediaQuery(useTheme().breakpoints.up("sm")) ? (
            <IconButton>
              <AddShoppingCartRounded />
            </IconButton>
          ) : null}
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
